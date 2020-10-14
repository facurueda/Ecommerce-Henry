const server = require("express").Router();
const passport = require("passport");
const Sequelize = require("sequelize");
const mercadopago = require("mercadopago");
const {
  User,
  Order,
  Product,
  Inter_Prod_Order,
  Direccion,
} = require("../db.js");

/////////////////////////////////////////////////////////////////////////////////////////////// FUNCTIONS TO SECURITY ROUTES
function isAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.level === "admin") {
      console.log("this user is ADMIN");
      return next();
    }
    console.log("this user DOESNT ADMIN");
  }
  console.log("THIS USER NOT AUTHENTICATED");
  // ** -- DIRIGIR A PAGINA QUE PREGUNTE SI ESTA PERDIDO ** -- //
  res.redirect("/");
}

function isUserOrAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.level === "user" || req.user.level === "admin") {
      console.log("el usuario esta logeado");
      return next();
    }
    console.log("this user is GUEST");
  }
  console.log("THIS USER NOT AUTHENTICATED");
  res.redirect("htpp://localhost:3000/auth/login");
}

///////////////////////////////////////////GET

server.get("/:idUser", (req, res, next) => {
  Order.findOne({
    where: {
      idUser: req.params.idUser,
      [Sequelize.Op.or]: [
        {
          status: "CREADA",
        },
        {
          status: "CARRITO",
        },
      ],
    },
    include: [
      {
        model: Product,
        as: "products",
      },
    ],
  })
    .then((order) => {
      res.send(order);
    })
    .catch(next);
});

server.get("/history/:idUser", (req, res, next) => {
  Order.findAll({
    where: {
      idUser: req.params.idUser,
    },
    include: [
      {
        model: Product,
        as: "products",
      },
    ],
  })
    .then((orders) => {
      res.send(orders);
    })
    .catch((error) => {
      next();
    });
});
server.get("/search", isAdmin, (req, res, next) => {
  Order.findAll({
    where: {
      status: {
        [Sequelize.Op.like]: "%" + req.query.query + "%",
      },
    },
  })
    .then((orders) => {
      res.send(orders);
    })
    .catch(next);
});

server.get("/", (req, res, next) => {
  Order.findAll({
    include: [
      {
        model: Product,
        as: "products",
      },
    ],
  })
    .then((orders) => {
      res.send(orders);
    })
    .catch(next);
});

server.post("/direccion", (req, res) => {
  Order.findAll({
    limit: 1,
    where: {
      idUser: req.user.idUser,
      status: "CERRADA",
    },
    order: [["createdAt", "DESC"]],
  })
    .then((order) => {
      return Direccion.findOne({
        where: {
          idOrder: order[0].idOrder,
        },
      });
    })
    .then((direccion) => {
      res.send(direccion);
    });
});

server.get("/", (req, res, next) => {
  Order.findAll({
    where: { status: "CERRADA" },
    include: [
      {
        model: Product,
        as: "products",
      },
    ],
  })
    .then((orders) => {
      res.send(orders);
    })
    .catch(next);
});
/////////////////////////////////////////POST

server.post("/cerrada", (req, res) => {
  Order.findAll({
    limit: 1,
    where: {
      idUser: req.user.idUser,
      status: 'CON ENVIO' || 'CON RETIRO',
    },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Product,
        as: "products",
      },
    ],
  }).then((products) => {
    res.send(products[0].products);
  });
});

server.post("/", (req, res, next) => {
  const { idUser, idProduct } = req.body;
  Order.create({
    idUser,
    idProduct,
  })
    .then((order) => {
      res.send(order);
    })
    .catch(next);
});

server.post("/setDireccion", (req, res) => {
  const {
    referencia,
    provincia,
    ciudad,
    calle,
    numeracion,
    barrio,
    piso,
    depto,
    CP,
  } = req.body.direccion;

  Direccion.create({
    referencia,
    provincia,
    ciudad,
    calle,
    numeracion,
    barrio,
    piso,
    depto,
    CP,
    idOrder: req.body.idOrderUser,
    idUser: req.user.idUser,
  })
    .then((direccion) => {
      res.send(direccion);
    })
    .catch((error) => {
      console.log(error);
    });
});

server.delete("/deleteDireccion", (req, res) => {
  // req.body --> idOrderUser

  Direccion.destroy({
    where: {
      idOrder: req.body.idOrderUser,
    },
  }).then(() => {
    res.send("Direccion Eliminada");
  });
});
///////////////////////////////////////////////////////////////////////////PUT

/////////////////////////////////////////////////////////////////////////// MERCADOPAGO
server.post("/checkout", async (req, res, next) => {
  // SI REQ.BODY TRAE 'cancelarEnvio' FALSE => NO HAY ENVIO ; TRUE => HAY ENVIO
  const { cancelarEnvio } = req.body;

 
  
  const allProdUser = await Order.findOne({
    where: {
      idUser: req.user.idUser,
      status: "CARRITO",
    },
  })
    .then((order) => {
      return Inter_Prod_Order.findAll({
        where: {
          idOrder: order.idOrder,
        },
      });
    })
    .catch(next);

  //////// -- RESTAR STOCK COMPRA DE STOCK TOTAL

  allProdUser.map(prod => {
    Product.findOne({
      where:{
        idProduct: prod.idProduct
      }
    }).then(product => {
      return product.update({
        ...product,
        stock: product.stock - prod.quantity
      })
    })
  })

  //////// -- PASAR ORDEN A CERRADA

  Order.findOne({
    where: {
      idOrder: req.body.idOrderUser,
    },
  }).then((order) => {
    if (cancelarEnvio) {
      return order.update({
        ...order,
        status: "CON ENVIO",
      });
    } else {
      return order.update({
        ...order,
        status: "CON RETIRO",
      });
    }
  });
    
  //////// -- CREARLE NUEVA ORDEN CREADA

  User.findOne({
    where: {
      idUser: req.user.idUser,
    },
  }).then((user) => {
    return Order.create({
      idUser: user.idUser,
      status: "CREADA",
    });
  });

  mercadopago.configure({
    access_token:
      "TEST-3269061119976940-092823-2fdadf82afd73900c02041d6888f47be-166321688",
  });
    
  // Crea un objeto de preferencia
  const preference = {
    items: allProdUser.map((relacion_product_order) => {
      return {
        title: "ALLPRODUCT: " + relacion_product_order.idProduct,
        description: "",
        unit_price: relacion_product_order.price,
        quantity: relacion_product_order.quantity,
      };
    }),
    auto_return: "approved",
    back_urls: {
      success: "http://localhost:3001/pagoSuccess",
      failure: "http://localhost:3001/pagoFailure",
    },
    shipments: {},
  };

  if (cancelarEnvio) {
    preference.shipments = {
      cost: 500,
      mode: "not_specified",
    };
  }

  mercadopago.preferences
    .create(preference)
    .then((response) => {
      res.send(response.body.init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
);


server.put('/cancelOrder', (req, res) => {
  Order.findOne({
    where:{
      idOrder: req.body.idOrder
    }
  }).then( order => {
    order.update({
      ...order,
      status: 'CANCELADA'
    })
  })
})


/////////////////////////////////DEV

module.exports = server;

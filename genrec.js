Reservas = new Mongo.Collection("reservas");
Recursos = new Mongo.Collection("recursos");

Router.onBeforeAction(function() {
  if (! Meteor.userId()) {
    this.render('login');
  } else {
    this.next();
  }
});

Router.route('/', function () {
  this.render('home');
});

Router.route('/reservas', function () {
  this.render('reservas');
});

Router.route('/recursos', function () {
  this.render('recursos');
});

Router.route('/usuarios', function () {
  this.render('usuarios');
});


Nivel = {
  ADMINISTRADOR: 1,
  GERENTE: 2,
  USUARIO: 3,
  '1': 'Administrador',
  '2': 'Gerente',
  '3': 'Usuário'
};

Prioridade = {
  PREFEITO: 1,
  SECRETARIO: 2,
  FUNCIONARIO: 3,
  MAL_FUNCIONARIO: 4,
  '1': 'Prefeito',
  '2': 'Secretario',
  '3': 'Funcionario',
  '4': 'Mal Funcionário'
};

Situacao = {
  ATIVO: 1,
  RESERVADO: 2,
  MANUTENCAO: 3
};

Pagina = {
  RESERVAS: 1,
  RECURSOS: 2,
  USUARIOS: 3
};
Lang = {
  nivel: function (nivel) {
    return Nivel[nivel];
  },
  prioridade: function (prioridade) {
    return Prioridade[prioridade];
  }
}

if (Meteor.isClient) {
  Usuarios = new Mongo.Collection('usuarios');
  Session.setDefault("pagina", Pagina.RESERVAS);
  Template.registerHelper("Nivel", function () {
      return Nivel;
  });
  Template.registerHelper("Prioridade", function () {
      return Prioridade;
  });
  Template.registerHelper("Situacao", function () {
      return Situacao;
  });
  Template.registerHelper("paginaAtual", function (pagina) {
    return Router.current().url === pagina;
  });
  Template.registerHelper("Pagina", function () {
    return Pagina;
  });
  Template.registerHelper("Lang", function () {
    return Lang;
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  Meteor.publish('users', function () {
    var sub = this;
    var userCursor = Meteor.users.find({});
    Mongo.Collection._publishCursor(userCursor, this, 'usuarios');
    sub.ready();
    return userCursor;
  });
  Meteor.publish("usuarios", function () {
    if (this.userId) {
      return Meteor.users.find({},
                               {fields: {'username': 1, 'profile': 1}});
    } else {
      this.ready();
    }
  });
}

// Accounts.createUser({
//   username: "admin",
//   email: "admin@genrec",
//   password: "admin",
//   profile: {
//     nivel: 1,
//     prioridade: 1
//   }
// });
const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;

const pool = new Pool({
  user: "postgres",
  host: "viaduct.proxy.rlwy.net",
  database: "railway",
  password: "5GCg6Ec5bGf3**bb6dG5DafCF5cG-CG6",
  port: "26587",
});

class Model {

  async getAverageAges() {
    const { rows } = await pool.query("SELECT AVG(EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento))) AS promedio_edad FROM public.usuario;");
    return rows;
  }

  async getAllUsers() {
    const { rows } = await pool.query("SELECT * FROM public.usuario;");
    return rows;
  }

  async getUserById(id) {
    const { rows } = await pool.query("SELECT * FROM public.usuario where id = $1;", [
      id,
    ]);
    return rows[0];
  }

  async addUser(cedula_identidad, nombres, primer_apellido, segundo_apellido, fecha_nacimiento) {
    await pool.query("INSERT INTO public.usuario (cedula_identidad, nombres, primer_apellido, segundo_apellido, fecha_nacimiento) values ($1, $2, $3, $4, $5)", 
                  [cedula_identidad, nombres, primer_apellido, segundo_apellido, fecha_nacimiento]);
  }

  async updateUser(id, cedula_identidad, nombres, primer_apellido, segundo_apellido, fecha_nacimiento) {
    await pool.query("UPDATE public.usuario SET cedula_identidad = $1, nombres = $2, primer_apellido = $3, segundo_apellido = $4, fecha_nacimiento = $5 WHERE id = $6", 
                  [cedula_identidad, nombres, primer_apellido, segundo_apellido, fecha_nacimiento, id]);
  }

  async deleteUser(id) {
    await pool.query("DELETE FROM public.usuario WHERE id = $1", [id]);
  }
}


class Controller {
  constructor(model) {
    this.model = model;
  }

  async getAverageAges(req, res) {
    const data = await this.model.getAverageAges();
    res.send(data);
  }

  async getAllUsers(req, res) {
    const data = await this.model.getAllUsers();
    res.send(data);
  }

  async getUserById(req, res) {
    const id = req.params.id;
    const data = await this.model.getUserById(id);
    res.send(data);
  }

  async addUser(req, res) {
    const cedula_identidad = req.body.cedula_identidad;
    const nombres = req.body.nombres;
    const primer_apellido = req.body.primer_apellido;
    const segundo_apellido = req.body.segundo_apellido;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    await this.model.addUser(cedula_identidad, nombres, primer_apellido, segundo_apellido, fecha_nacimiento);
    res.sendStatus(201);

    
  }

  async updateUser(req, res) {
    const id = req.params.id;
    const cedula_identidad = req.body.cedula_identidad;
    const nombres = req.body.nombres;
    const primer_apellido = req.body.primer_apellido;
    const segundo_apellido = req.body.segundo_apellido;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    await this.model.updateUser(id, cedula_identidad, nombres, primer_apellido, segundo_apellido, fecha_nacimiento);
    res.sendStatus(200);
  }

  async deleteUser(req, res) {
    const id = req.params.id;
    await this.model.deleteUser(id);
    res.sendStatus(200);
  }
}

const model = new Model();
const controller = new Controller(model);

app.use(express.json());

app.get("/user/average", controller.getAverageAges.bind(controller));
app.get("/user/list", controller.getAllUsers.bind(controller));
app.get("/user/:id", controller.getUserById.bind(controller));
app.post("/user", controller.addUser.bind(controller));
app.put("/user/:id", controller.updateUser.bind(controller));
app.delete("/user/:id", controller.deleteUser.bind(controller));

app.listen(port, () => {
  console.log(`Esta Api Rest de Mike se ejecuta en http://localhost:${port}`);
});

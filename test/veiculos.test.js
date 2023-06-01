const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');

const { expect } = chai;
chai.use(chaiHttp);

const app = require('../src/api/server');

describe('CRUD de Veículos', () => {
  const dataFilePath = 'src/models/veiculos.json';

  beforeEach(done => {
    const initialData = JSON.stringify([
      {
        id: '1',
        placa: 'ABC1234',
        chassi: '123456789',
        renavam: '987654321',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2021,
      },
    ]);

    fs.writeFile(dataFilePath, initialData, err => {
      if (err) {
        console.error(err);
      }
      done();
    });
  });

  afterEach(done => {
    fs.unlink(dataFilePath, err => {
      if (err) {
        console.error(err);
      }
      done();
    });
  });

  describe('GET /veiculos', () => {
    it('Deve retornar todos os veículos', done => {
      chai
        .request(app)
        .get('/veiculos')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(1);
          done();
        });
    });
  });

  describe('GET /veiculos/:id', () => {
    it('Deve retornar um veículo pelo ID', done => {
      chai
        .request(app)
        .get('/veiculos/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.id).to.equal('1');
          done();
        });
    });

    it('Deve retornar um erro se o veículo não for encontrado', done => {
      chai
        .request(app)
        .get('/veiculos/2')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal('Veículo não encontrado.');
          done();
        });
    });
  });

  describe('POST /veiculos', () => {
    it('Deve criar um novo veículo', done => {
      const newVeiculo = {
        id: '2',
        placa: 'XYZ5678',
        chassi: '987654321',
        renavam: '123456789',
        modelo: 'Corolla',
        marca: 'Toyota',
        ano: 2022,
      };

      chai
        .request(app)
        .post('/veiculos')
        .send(newVeiculo)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.deep.include(newVeiculo);
          done();
        });
    });
  });

  describe('PUT /veiculos/:id', () => {
    it('Deve atualizar um veículo existente', done => {
      const updatedVeiculo = {
        ano: 2023,
      };

      chai
        .request(app)
        .put('/veiculos/1')
        .send(updatedVeiculo)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.id).to.equal('1');
          expect(res.body.ano).to.equal(2023);
          done();
        });
    });

    it('Deve retornar um erro se o veículo não for encontrado', done => {
      const updatedVeiculo = {
        ano: 2023,
      };

      chai
        .request(app)
        .put('/veiculos/2')
        .send(updatedVeiculo)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal('Veículo não encontrado.');
          done();
        });
    });
  });

  describe('DELETE /veiculos/:id', () => {
    it('Deve excluir um veículo', done => {
      chai
        .request(app)
        .delete('/veiculos/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Veículo deletado.');

          fs.readFile(dataFilePath, 'utf8', (err, data) => {
            expect(data).to.equal('[]');
            done();
          });
        });
    });

    it('Deve retornar um erro se o veículo não for encontrado', done => {
      chai
        .request(app)
        .delete('/veiculos/2')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal('Veículo não encontrado.');
          done();
        });
    });
  });
});

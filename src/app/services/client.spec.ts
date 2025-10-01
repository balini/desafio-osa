import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Cliente } from '../interfaces/cliente.interface';
import { ClienteService } from './client.service';

describe('ClienteService', () => {
  let service: ClienteService;
  let httpMock: HttpTestingController;

  const mockClientes: Cliente[] = [
    { id: 1, nome: 'Alice', email: 'alice@email.com', telefone: '123', agencia: '001', conta: '12345' },
    { id: 2, nome: 'Bob', email: 'bob@email.com', telefone: '456', agencia: '002', conta: '67890' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClienteService]
    });

    service = TestBed.inject(ClienteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // garante que não há requisições pendentes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all clientes', () => {
    service.getAll().subscribe(clientes => {
      expect(clientes.length).toBe(2);
      expect(clientes).toEqual(mockClientes);
    });

    const req = httpMock.expectOne('http://localhost:3000/clientes');
    expect(req.request.method).toBe('GET');
    req.flush(mockClientes);
  });

  it('should fetch cliente by id', () => {
    const cliente = mockClientes[0];

    service.getById(cliente.id!).subscribe((res: any) => {
      expect(res).toEqual(cliente);
    });

    const req = httpMock.expectOne(`http://localhost:3000/clientes/${cliente.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(cliente);
  });

  it('should create a new cliente', () => {
    const newCliente: Cliente = { nome: 'Charlie', email: '', telefone: '', agencia: '', conta: '' };

    service.create(newCliente).subscribe(res => {
      expect(res).toEqual(newCliente);
    });

    const req = httpMock.expectOne('http://localhost:3000/clientes');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCliente);
    req.flush(newCliente);
  });

  it('should update an existing cliente', () => {
    const cliente = { ...mockClientes[0], nome: 'Alice Updated' };

    service.update(cliente).subscribe(res => {
      expect(res).toEqual(cliente);
    });

    const req = httpMock.expectOne(`http://localhost:3000/clientes/${cliente.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(cliente);
    req.flush(cliente);
  });

  it('should delete a cliente', () => {
    const clienteId = 1;

    service.delete(clienteId).subscribe(res => {
      expect(res).toEqual({});
    });

    const req = httpMock.expectOne(`http://localhost:3000/clientes/${clienteId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});


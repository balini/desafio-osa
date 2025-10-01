import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackofficeComponent } from './backoffice.component';
import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Cliente } from '../../interfaces/cliente.interface';

describe('Backoffice', () => {
  let component: BackofficeComponent;
  let fixture: ComponentFixture<BackofficeComponent>;
  let httpMock: HttpTestingController;

  const mockClientes: Cliente[] = [
    { id: 1, nome: 'João', email: 'joao@email.com', telefone: '123', agencia: '001', conta: '1111' },
    { id: 2, nome: 'Maria', email: 'maria@email.com', telefone: '456', agencia: '002', conta: '2222' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackofficeComponent],
      providers: [HttpClientTestingModule, HttpClient],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackofficeComponent);
    httpMock = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should load clientes on init', () => {
    const req = httpMock.expectOne('http://localhost:3000/clientes');
    expect(req.request.method).toBe('GET');
    req.flush(mockClientes);

    expect(component.clientes.length).toBe(2);
    expect(component.clientes[0].nome).toBe('João');
  });

    it('should filter clientes by name', () => {
    component.clientes = mockClientes;
    component.searchTerm = 'Maria';

    const filtered = component.filteredClientes();
    expect(filtered.length).toBe(1);
    expect(filtered[0].nome).toBe('Maria');
  });

   it('should update existing cliente via PUT', () => {
    component.editingCliente = { ...mockClientes[0] };
    component.saveCliente();

    const req = httpMock.expectOne(`http://localhost:3000/clientes/${mockClientes[0].id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(component.editingCliente);

    // Simula recarregar clientes
    const getReq = httpMock.match('http://localhost:3000/clientes');
    getReq[getReq.length - 1].flush(mockClientes);

    expect(component.modalVisible).toBeFalse();
  });

  it('should delete cliente via DELETE', () => {
    component.deleteCliente(1);

    const req = httpMock.expectOne(`http://localhost:3000/clientes/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});

    const getReqs = httpMock.match('http://localhost:3000/clientes');
     getReqs[getReqs.length - 1].flush([mockClientes[1]]);

    expect(component.clientes.length).toBe(1);
    expect(component.clientes[0].nome).toBe('Maria');
  });
});
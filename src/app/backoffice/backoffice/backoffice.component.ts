import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss'],
  standalone: false
})
export class BackofficeComponent implements OnInit {
  clientes: Cliente[] = [];
  searchTerm = '';
  modalVisible = false;
  editingCliente: Cliente = { nome: '', email: '', telefone: '', agencia: '', conta: '' };
  columns = ['nome', 'email', 'telefone', 'agencia', 'conta', 'acoes'];

  constructor(private http: HttpClient) {}

  ngOnInit() { this.loadClientes(); }

  loadClientes() {
    this.http.get<Cliente[]>('http://localhost:3000/clientes').subscribe(data => this.clientes = data);
  }

  filteredClientes() {
    if (!this.searchTerm) return this.clientes;
    return this.clientes.filter(c => c.nome.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  openModal(cliente?: Cliente) {
    this.editingCliente = cliente ? { ...cliente } : { nome: '', email: '', telefone: '', agencia: '', conta: '' };
    this.modalVisible = true;
  }

  saveCliente() {
    if (this.editingCliente.id) {
      this.http.put(`http://localhost:3000/clientes/${this.editingCliente.id}`, this.editingCliente)
        .subscribe(() => this.loadClientes());
    } else {
      this.http.post('http://localhost:3000/clientes', this.editingCliente)
        .subscribe(() => this.loadClientes());
    }
    this.modalVisible = false;
  }

  deleteCliente(id?: number) {
    if(id) this.http.delete(`http://localhost:3000/clientes/${id}`).subscribe(() => this.loadClientes());
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioService } from 'src/app/service/servicio.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  public formContacto !: FormGroup
  data:any[]=[]
  constructor(private readonly builder:FormBuilder, private route:Router, public service:ServicioService){}
  ngOnInit(): void {
    
    this.formContacto=this.initForm();
    this.mostrar();
}

initForm():FormGroup{
  return this.builder.group({
    Nombre:['',[Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    Apellidos:['',[Validators.required, Validators.minLength(5)]],
    Email:['',[Validators.required, Validators.email]],
    Website:['',[Validators.required]],
  });
}

  
  agregar(){
    if(this.formContacto.valid){
      this.service.addUsers(this.formContacto.value)
      Swal.fire({
        title: 'Agregado',
        text: 'Estas registrado',
        imageUrl: 'https://www.cyberdefendersprogram.com/assets/undraw-svgs/undraw_Security_on_s9ym.svg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
    }else {
      Swal.fire({
        icon: 'warning',
        title: '',
        text: 'Los campos no deben estar vacios!'
      })
    }}

  mostrar(){
   this.service.getUsers().subscribe (res=>{
    this.data = res
   }) 
  }

}
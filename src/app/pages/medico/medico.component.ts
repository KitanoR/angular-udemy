import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Hospital } from "../../models/hospital.model";
import { MedicoService } from "../../services/medico/medico.service";
import { HospitalesService } from "../../services/hospitales/hospitales.service";
import { Medico } from "../../models/medico.model";
import { Router, ActivatedRoute } from "@angular/router";
import { ModalUploadService } from "../../components/modal-upload/modal-upload.service";

@Component({
  selector: "app-medico",
  templateUrl: "./medico.component.html",
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico("", "", "", "", "");
  hospital: Hospital = new Hospital("");
  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalesService,
    public router: Router,
    public _modalUpload: ModalUploadService,
    public route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      let id = params["id"];
      if (id !== "nuevo") {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    this._hospitalService.cargarHospitales().subscribe((hospitales: any) => {
      this.hospitales = hospitales.hospital;
      console.log(hospitales);
    });
    this._modalUpload.notificacion.subscribe((data: any) => {
      this.medico.img = data.medico.img;
    });
  }
  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id).subscribe(medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }
  guardarMedico(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);
    if (f.invalid) {
      return;
    }
    this._medicoService.guardarMedico(this.medico).subscribe(data => {
      this.medico._id = data._id;
      this.router.navigate(["/medico", data._id]);
    });
  }
  cambioHospital(id: any) {
    console.log(id);
    this._hospitalService
      .obtenerHospital(id)
      .subscribe((hospital: any) => (this.hospital = hospital.hospital));
  }
  cambiarFoto() {
    this._modalUpload.mostrarModal("medicos", this.medico._id);
  }
}

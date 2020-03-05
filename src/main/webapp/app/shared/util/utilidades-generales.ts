import { IColaborador } from 'app/shared/model/colaborador.model';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class UtilidadesColaborador {
  /**
   * Recibe un objeto Colaborador y devuelve un string con los datos en formato 'Nombre1 Nombre2? Apellido1 Apellido2?'
   * @param parCol Objeto tipo IColaborador
   */
  getStrColaborador(parCol: IColaborador): string {
    let nombreCompleto = '';
    if (parCol !== null) {
      nombreCompleto =
        parCol.nombre1 +
        ' ' +
        (parCol.nombre2 ? parCol.nombre2 : '') +
        ' ' +
        parCol.apellido1 +
        ' ' +
        (parCol.apellido2 ? parCol.apellido2 : '');
    }
    return nombreCompleto;
  }

  /**
   * Recibe un objeto Colaborador y devuelve un string con los datos en formato 'NumDocumento: Nombre1 Nombre2? Apellido1 Apellido2?'
   * @param parCol Objeto tipo IColaborador
   */
  getStrColaboradorConDocumento(parCol: IColaborador): string {
    let nombreCompleto = '';
    if (parCol !== null) {
      nombreCompleto =
        parCol.numeroDocumento +
        ': ' +
        parCol.nombre1 +
        ' ' +
        (parCol.nombre2 ? parCol.nombre2 : '') +
        ' ' +
        parCol.apellido1 +
        ' ' +
        (parCol.apellido2 ? parCol.apellido2 : '');
    }
    return nombreCompleto;
  }
}

@Injectable({ providedIn: 'root' })
export class UtilidadesFecha {
  /**
   * Recibe un objeto tipo Date y crea un cadena con el formato YYYY-MM-DD
   * @param parFecha Objeto de tipo Date
   */
  getStringFecha(parFecha: Date): string {
    let res = '';
    if (parFecha !== null) {
      res = parFecha.getFullYear().toString() + '-';
      if (parFecha.getMonth() + 1 < 10) {
        res += '0';
      }
      res += (parFecha.getMonth() + 1).toString() + '-';
      if (parFecha.getDate() < 10) {
        res += '0';
      }
      res += parFecha.getDate().toString();
    }
    return res;
  }

  /**
   * Recibe dos fechas para comparar. Si la fecha1 es mayor que fecha2, devuelve True, de lo contrario devuelve False
   * @param parFecha1 Objeto Date
   * @param parFecha2 Objeto Date
   */
  fechaMayorQue(parFecha1: Date, parFecha2: Date): boolean {
    let respuesta;
    if (parFecha1 > parFecha2) {
      respuesta = true;
    } else {
      respuesta = false;
    }
    return respuesta;
  }

  convertirDateAMoment(parFecha: Date): moment.Moment {
    const strFecha =
      parFecha.getFullYear() +
      '-' +
      (parFecha.getMonth() + 1) +
      '-' +
      parFecha.getDate() +
      ' ' +
      parFecha.getHours() +
      ':' +
      parFecha.getMinutes();
    const varMoment = moment(strFecha);
    return varMoment;
  }
}

@Injectable({ providedIn: 'root' })
export class UtilidadesString {
  contieneNumeros(parCadena: string): boolean {
    const str = parCadena.trim();
    if (
      str.includes('0') ||
      str.includes('1') ||
      str.includes('2') ||
      str.includes('3') ||
      str.includes('4') ||
      str.includes('5') ||
      str.includes('6') ||
      str.includes('7') ||
      str.includes('8') ||
      str.includes('9')
    ) {
      return true;
    } else {
      return false;
    }
  }

  getArrayPalabras(nombres: string): string[] {
    const arrayInicial = nombres.split(' ');
    const arrayFinal = arrayInicial.filter((valor: string) => valor !== '');
    return arrayFinal;
  }
}

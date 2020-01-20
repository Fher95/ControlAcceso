/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package empaques.controlacceso.domain;

/**
 *
 * @author FHER
 */
public class Respuesta {

    public int numAsignaciones;
    public int numRechazados;

    public Respuesta(int numAsignaciones, int numRechazados) {
        this.numAsignaciones = numAsignaciones;
        this.numRechazados = numRechazados;
    }
}

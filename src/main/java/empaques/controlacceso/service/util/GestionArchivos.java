package empaques.controlacceso.service.util;

import java.util.ArrayList;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

public final class GestionArchivos {

    private final String rutaArchivo = "datosAsistencia.txt";
    public boolean existeArchivo() {
        File archivo = new File(this.rutaArchivo);
        if (!archivo.exists()) {
            return false;
        } else return true;        
    }

    /**
     * Este método lee un archivo en la ruta raíz del proyecto y retorna todas
     * las lineas leidas en un vector de Strings
     *
     * @return ArrayList<String> lineasLeídas
     */
    public ArrayList<String> leerLineasArchivo() {
        System.out.println("Comienza lectura de archivo.");
        File archivo = null;
        FileReader fr = null;
        BufferedReader br = null;
        ArrayList<String> listaLineas = new ArrayList();
        try {
            // Apertura del fichero y creacion de BufferedReader para poder
            // hacer una lectura comoda (disponer del metodo readLine()).
            archivo = new File("datosAsistencia.txt");
            System.out.println(archivo.getAbsolutePath());

            fr = new FileReader(archivo);
            br = new BufferedReader(fr);

            // Lectura del fichero
            String linea;
            while ((linea = br.readLine()) != null) {
                System.out.println(linea);
                listaLineas.add(linea);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // En el finally cerramos el fichero, para asegurarnos
            // que se cierra tanto si todo va bien como si salta
            // una excepcion.
            try {
                if (null != fr) {
                    fr.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        System.out.println("Lectura Finalizada.");
        return listaLineas;
    }

}

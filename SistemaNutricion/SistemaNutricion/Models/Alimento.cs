namespace SistemaNutricion.Models
{
    public class Alimento
    {        
        public int Id { get; set; }
        public string Nombre { get; set; }
        public double Calorias { get; set; }
        public double Carbohidratos { get; set; }
        public double Grasas { get; set; }
        public double Proteinas { get; set; }
        public double Sodio { get; set; }
        public double Azucar { get; set; }

      /*  public Alimento(int id, string nombre, string porcion, int cantidad, double gramos, double calorias, double carbohidratos, double grasas, double proteinas, double sodio, double azucar)
        {
            Id = id;
            Nombre = nombre;
            Porcion = porcion;
            Cantidad = cantidad;
            Gramos = gramos;
            Calorias = calorias;
            Carbohidratos = carbohidratos;
            Grasas = grasas;
            Proteinas = proteinas;
            Sodio = sodio;
            Azucar = azucar;
        }

        */

    }
}

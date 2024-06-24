namespace SistemaNutricion.Models
{
    public class RegistroEjercicio
    {

        public int Id { get; set; }
       public int UsuarioId { get; set; }
        public int EjercicioId { get; set; }
        public float TiempoEnMinutos { get; set; }
        public float CaloriasQuemadas { get; set; }

        public  Ejercicio Ejercicio { get; set; }
        public Usuario Usuario { get; set; }
    }
}

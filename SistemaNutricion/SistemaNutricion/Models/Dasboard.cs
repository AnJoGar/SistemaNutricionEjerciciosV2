namespace SistemaNutricion.Models
{
    public class Dasboard
    {

        public int Id { get; set; }
        public int RegistroEjercicioId { get; set; }
        public int UsuarioId { get; set; }
        public Ejercicio RegistroEjercicio { get; set; }
        public Usuario Usuario { get; set; }



    }
}

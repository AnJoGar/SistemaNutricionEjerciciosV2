namespace SistemaNutricion.Models
{
    public class RegistroAlimento
    {
        public int Id { get; set; } //id de resgistro
        public string Nombre { get; set; } //nombre del alimento resgistrado
        public int UsuarioId { get; set; }
        public int AlimentoId { get; set; }
        public string Porcion { get; set; }
        public int Cantidad { get; set; }
        public double Gramos { get; set; }

        
        public Alimento Alimento { get; set; }
        public Usuario Usuario { get; set; }

    }
}

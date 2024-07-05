using SistemaNutricion.DTO;
using SistemaNutricion.Models;
using SistemaNutricion.Repository.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SistemaNutricion.Repository.Implementacion
{
    public class AlimentoRepository : IAlimentoRepository
    {
        private readonly YourDbContext _context;

        public AlimentoRepository(YourDbContext context)
        {
            _context = context;
        }

        public async Task<List<AlimentoDTO>> ListaAlimentos()
        {
            // Implementa tu lógica de obtención de lista de alimentos aquí
        }

        public async Task<AlimentoDTO> ObtenerPorIdAlimento(int id)
        {
            // Implementa tu lógica de obtención de alimento por ID aquí
        }

        public async Task<AlimentoDTO> CrearAlimento(AlimentoDTO alimento)
        {
            // Implementa tu lógica de creación de alimento aquí
        }
    }
}

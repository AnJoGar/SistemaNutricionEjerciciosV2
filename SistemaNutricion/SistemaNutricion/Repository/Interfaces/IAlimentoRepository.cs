using SistemaNutricion.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SistemaNutricion.Repository.Interfaces
{
    public interface IAlimentoRepository
    {
        Task<List<AlimentoDTO>> ListaAlimentos();
        Task<AlimentoDTO> ObtenerPorIdAlimento(int id);
        Task<AlimentoDTO> CrearAlimento(AlimentoDTO alimento);
    }
}

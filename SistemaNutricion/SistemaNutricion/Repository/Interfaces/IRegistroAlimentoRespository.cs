using SistemaNutricion.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SistemaNutricion.Repository.Interfaces
{
    public interface IRegistroAlimentoRepository
    {
        Task<RegistroAlimentoDTO> CrearRegistroAlimento(RegistroAlimentoDTO registroAlimento);
        Task<List<RegistroAlimentoDTO>> ListaRegistroAlimento();
        Task<List<ConsultarFechaDTO>> ReporteAlimento(string? fechaInicio);
        Task<List<ConsultarFechaDTO>> ListaRegistroAlimento2();
        Task<RegistroAlimentoDTO> ObtenerPorIdRegistroAlimento(int id);
    }
}

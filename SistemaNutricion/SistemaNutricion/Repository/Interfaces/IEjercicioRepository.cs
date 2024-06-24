using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SistemaNutricion.DTO;

namespace SistemaNutricion.Repository.Interfaces
{
    public interface IEjercicioRepository
    {
        Task<List<EjercicioDTO>> listaEjercicios();

        Task<EjercicioDTO> obtenerPorIdEjercicio(int id);

        Task<EjercicioDTO> crearEjercicio(EjercicioDTO modelo);

    }
}

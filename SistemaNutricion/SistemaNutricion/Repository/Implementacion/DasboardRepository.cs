using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using System.Linq;
using SistemaNutricion.Repository.Contratos;
using SistemaNutricion.Repository.Interfaces;
using SistemaNutricion.Repository;
using SistemaNutricion.Models;
using SistemaNutricion.DTO;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using Microsoft.Extensions.Logging;

namespace SistemaNutricion.Repository.Implementacion
{
    public class DasboardRepository:IDasboardRepository
    {

        private readonly IGenrericRepository<Dasboard> _EjercicioRepositorio;
        private readonly IGenrericRepository<RegistroEjercicio> _EjercicioRepositorio1;
        private readonly IGenrericRepository<RegistroEjercicio> _EjercicioRepositorio2;
        private readonly IMapper _mapper;
        private readonly ILogger<DasboardRepository> _logger;

        public DasboardRepository(IGenrericRepository<Dasboard> dasboardRepository, IGenrericRepository<RegistroEjercicio> dasboardRepository1, IMapper mapper, ILogger<DasboardRepository> logger)
        {
            _EjercicioRepositorio = dasboardRepository;
            _mapper = mapper;
            _logger = logger;
        _EjercicioRepositorio1=dasboardRepository1;
        }
  


        public async Task<DasboardDTO> listaDasboard(int id)
        {
            try
            {
                var EjercicioEncontrado = await _EjercicioRepositorio1
                    .Obtenerid(u => u.Id == id);
                var listaUsuario = EjercicioEncontrado.Include(re => re.Ejercicio)
                   .Include(re => re.Usuario)
                    .ToList();
               var Ejercicio = listaUsuario.FirstOrDefault();
                if (Ejercicio == null)
                    throw new TaskCanceledException("Usuario no encontrado");
                return _mapper.Map<DasboardDTO>(Ejercicio);
            }
            catch
            {
                throw;
            }
        }

      

        public async Task<List<RegistroEjercicioDTO>> listaDasboard2()
        {
            try
            {
                _logger.LogInformation("Obteniendo lista de Dasboard");

                var queryEjercicio = await _EjercicioRepositorio1.Consultar();
                var listaEjercicio = await queryEjercicio
                    .Include(re => re.Ejercicio)
                    .Include(re => re.Usuario)
                    .ToListAsync();

                _logger.LogInformation("Ejercicios obtenidos: {Count}", listaEjercicio.Count);

                if (!listaEjercicio.Any())
                {
                    _logger.LogWarning("No se encontraron registros de ejercicio");
                }

                _logger.LogInformation("Mapeando lista de Dasboard a lista de DasboardDTO");
                return _mapper.Map<List<RegistroEjercicioDTO>>(listaEjercicio);
            }
            catch (Exception ex)
            {
                ILogger.Equals(ex, "Error al obtener la lista de dashboard");
                throw;
            }
        }


        public async Task<List<DasboardDTO>> listaDasboard1()
        {
            try
            {
                _logger.LogInformation("Obteniendo lista de Dasboard");

                var queryEjercicio = await _EjercicioRepositorio1.Consultar();
                var listaEjercicio = await queryEjercicio
                    .Include(re => re.Ejercicio)
                    .Include(re => re.Usuario)
                    .ToListAsync();

                _logger.LogInformation("Ejercicios obtenidos: {Count}", listaEjercicio.Count);

                if (!listaEjercicio.Any())
                {
                    _logger.LogWarning("No se encontraron registros de ejercicio");
                }

                _logger.LogInformation("Mapeando lista de Dasboard a lista de DasboardDTO");
                return _mapper.Map<List<DasboardDTO>>(listaEjercicio);
            }
            catch (Exception ex)
            {
                ILogger.Equals(ex, "Error al obtener la lista de dashboard");
                throw;
            }
        }



        public async Task<List<ConsultarFechaDTO>> obtenerPorIdConsultarFechaYej(int id)
        {
            try
            {
                var EjercicioEncontrado = await _EjercicioRepositorio2
                    .Obtenerid(u => u.Usuario.Id == id);
                var listaUsuario = EjercicioEncontrado.Include(re => re.Ejercicio)
                    .Include(re => re.Usuario)
                    .ToList();
                var Ejercicio = listaUsuario.ToList();
                if (Ejercicio == null)
                    throw new TaskCanceledException("Usuario no encontrado");
                return _mapper.Map<List<ConsultarFechaDTO>>(listaUsuario);
            }
            catch
            {
                throw;
            }
        }












    }
}

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
using BCrypt.Net;
using System.Security.Cryptography;
using static SistemaNutricion.Repository.Implementacion.EjercicioRepositorio;
using System.Globalization;


namespace SistemaNutricion.Repository.Implementacion
{
    public class RegistroEjercicioRepositorio: IRegistroEjercicioRepository 
    {


        private readonly IGenrericRepository<RegistroEjercicio> _EjercicioRepositorio;

        private readonly IMapper _mapper;
        private readonly IGenrericRepository<Ejercicio> _EjercicioDTORepositorio; 

        public RegistroEjercicioRepositorio(IGenrericRepository<RegistroEjercicio> ejercicioRepositorio, IMapper mapper, IGenrericRepository<Ejercicio> ejercicioDTORepositorio)
        {
            _EjercicioRepositorio = ejercicioRepositorio;
            _mapper = mapper;
            _EjercicioDTORepositorio = ejercicioDTORepositorio;
        }


        public async Task<List<RegistroEjercicioDTO>> listaRegistroEjercicio()
        {
    
            try
            {
                var queryEjercicio = await _EjercicioRepositorio.Consultar();
                var listaEjericio = queryEjercicio
                    .Include(re => re.Ejercicio)
                    .Include(re => re.Usuario)
                    .ToList(); 
                // Recorremos la lista de usuarios y reemplazamos el hash de la contraseña por el texto plano
                return _mapper.Map<List<RegistroEjercicioDTO>>(listaEjericio);
            }
            catch
            {

                throw;
            }
        }

        public async Task<RegistroEjercicioDTO> obtenerPorIdRegistroEjercicio(int id)
        {
            try
            {
                var EjercicioEncontrado = await _EjercicioRepositorio
                    .Obtenerid(u => u.Id == id);
                var listaUsuario = EjercicioEncontrado.Include(re => re.Ejercicio)
                    .Include(re => re.Usuario)
                    .ToList(); 
                var Ejercicio = listaUsuario.FirstOrDefault();
                if (Ejercicio == null)
                    throw new TaskCanceledException("Usuario no encontrado");
                return _mapper.Map<RegistroEjercicioDTO>(Ejercicio);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<RegistroEjercicioDTO>> obtenerPorIdUsuario(int id)
        {
            try
            {
                var EjercicioEncontrado = await _EjercicioRepositorio
                    .Obtenerid(u => u.Usuario.Id == id);
                var listaUsuario = EjercicioEncontrado.Include(re => re.Ejercicio)
                    .Include(re => re.Usuario)
                    .ToList(); 
                var Ejercicio = listaUsuario.ToList(); 
               if (Ejercicio == null)
                    throw new TaskCanceledException("Usuario no encontrado");
                return _mapper.Map<List<RegistroEjercicioDTO>>(listaUsuario);
            }
            catch
            {
                throw;
            }
        }


        public async Task<RegistroEjercicioDTO> crearRegistroEjercicio(RegistroEjercicioDTO modelo)
        {
            try
            {

                // RegistroEjercicio nuevoRegistro = _mapper.Map<RegistroEjercicio>(modelo);
                var ejercicioDTO = await _EjercicioDTORepositorio.Obtener(e => e.Id == modelo.EjercicioId);

                if (ejercicioDTO == null)
                {
                    throw new Exception("No se encontró el ejercicio especificado.");
                }

                // Calcular EjercicioValor multiplicando caloriasQuemadas por TiempoEnMinutos
                /////// modelo.EjercicioValor = ejercicioDTO.caloriasQuemadas * modelo.TiempoEnMinutos;
                modelo.CaloriasQuemadas = ejercicioDTO.caloriasQuemadas * modelo.TiempoEnMinutos;
                // Calcular EjercicioValor multiplicando caloriasQuemadas por TiempoEnMinutos



                var EjercicioCreado = await _EjercicioRepositorio.Crear(_mapper.Map<RegistroEjercicio>(modelo));
               
                if (EjercicioCreado.Id == 0)
                    throw new TaskCanceledException("No se pudo Crear");

               

                var query = await _EjercicioRepositorio.Consultar(u => u.Id == EjercicioCreado.Id);
                var registroEjercicioConRelaciones = query
                    .Include(re => re.Ejercicio)
                       
                        
                    .Include(re => re.Usuario)
                    .FirstOrDefault();



                // Mapear el resultado a DTO
                return _mapper.Map<RegistroEjercicioDTO>(registroEjercicioConRelaciones);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<ConsultarFechaDTO>> listaRegistroEjercicio2()
        {

            try
            {
                var queryEjercicio = await _EjercicioRepositorio.Consultar();
                var listaEjericio = queryEjercicio
                    .Include(re => re.Ejercicio)
                    .Include(re => re.Usuario)
                    .ToList();
                // Recorremos la lista de usuarios y reemplazamos el hash de la contraseña por el texto plano
                return _mapper.Map<List<ConsultarFechaDTO>>(listaEjericio);
            }
            catch
            {

                throw;
            }
        }


        public async Task<List<ConsultarFechaDTO>> ReporteEjercicio(string fechaInicio)
        {
            IQueryable<RegistroEjercicio> query = await _EjercicioRepositorio.Consultar();
            var listaResultado = new List<RegistroEjercicio>();
            try
            {
                if (string.IsNullOrEmpty(fechaInicio))
                {
                    listaResultado = await query
                        .Include(p => p.Usuario)
                        .Include(p => p.Ejercicio)
                       
                        .ToListAsync();
                }
                else
                {
                    DateTime fech_Inicio = DateTime.ParseExact(fechaInicio, "dd/MM/yyyy", new CultureInfo("es-EC"));
                
                    listaResultado = await query
                        .Include(p => p.Usuario)
                        .Include(p => p.Ejercicio)
                    
                        .Where(dv =>
                            dv.FechaRegistro.Value.Date == fech_Inicio.Date 
                      
                        ).ToListAsync();
                }
               
            }
            catch
            {
                throw;
            }
            return _mapper.Map<List<ConsultarFechaDTO>>(listaResultado);
        }

    }
}

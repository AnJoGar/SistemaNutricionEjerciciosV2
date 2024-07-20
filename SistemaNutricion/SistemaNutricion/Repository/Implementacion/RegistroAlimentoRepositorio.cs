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
    public class RegistroAlimentoRepositorio : IRegistroAlimentoRepository
    {
        private readonly IGenrericRepository<RegistroAlimento> _alimentoRepositorio;
        private readonly IMapper _mapper;
        private readonly IGenrericRepository<Alimento> _alimentoDTORepositorio;

        public RegistroAlimentoRepositorio(
            IGenrericRepository<RegistroAlimento> alimentoRepositorio,
            IMapper mapper,
            IGenrericRepository<Alimento> alimentoDTORepositorio)
        {
            _alimentoRepositorio = alimentoRepositorio;
            _mapper = mapper;
            _alimentoDTORepositorio = alimentoDTORepositorio;
        }

        public async Task<List<RegistroAlimentoDTO>> ListaRegistroAlimento()
        {
            try
            {
                var queryAlimento = await _alimentoRepositorio.Consultar();
                var listaAlimento = queryAlimento
                    .Include(re => re.Alimento)
                    .Include(re => re.Usuario)
                    .ToList();
                return _mapper.Map<List<RegistroAlimentoDTO>>(listaAlimento);
            }
            catch
            {
                throw;
            }
        }

        public async Task<RegistroAlimentoDTO> ObtenerPorIdRegistroAlimento(int id)
        {
            try
            {
                var alimentoEncontrado = await _alimentoRepositorio.Obtenerid(u => u.Id == id);
                var listaAlimento = alimentoEncontrado
                    .Include(re => re.Alimento)
                    .Include(re => re.Usuario)
                    .ToList();
                var alimento = listaAlimento.FirstOrDefault();
                if (alimento == null)
                    throw new TaskCanceledException("Registro de Alimento no encontrado");
                return _mapper.Map<RegistroAlimentoDTO>(alimento);
            }
            catch
            {
                throw;
            }
        }

        public async Task<RegistroAlimentoDTO> CrearRegistroAlimento(RegistroAlimentoDTO modelo)
        {
            try
            {
                var alimentoDTO = await _alimentoDTORepositorio.Obtener(a => a.Id == modelo.AlimentoId);

                if (alimentoDTO == null)
                {
                    throw new Exception("No se encontró el alimento especificado.");
                }

                var alimentoCreado = await _alimentoRepositorio.Crear(_mapper.Map<RegistroAlimento>(modelo));

                if (alimentoCreado.Id == 0)
                    throw new TaskCanceledException("No se pudo Crear el registro de alimento");

                var query = await _alimentoRepositorio.Consultar(u => u.Id == alimentoCreado.Id);
                var registroAlimentoConRelaciones = query
                    .Include(re => re.Alimento)
                    .Include(re => re.Usuario)
                    .FirstOrDefault();

                return _mapper.Map<RegistroAlimentoDTO>(registroAlimentoConRelaciones);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<ConsultarFechaDTO>> ListaRegistroAlimento2()
        {
            try
            {
                var queryAlimento = await _alimentoRepositorio.Consultar();
                var listaAlimento = queryAlimento
                    .Include(re => re.Alimento)
                    .Include(re => re.Usuario)
                    .ToList();
                return _mapper.Map<List<ConsultarFechaDTO>>(listaAlimento);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<ConsultarFechaDTO>> ReporteAlimento(string? fechaInicio)
        {
            IQueryable<RegistroAlimento> query = await _alimentoRepositorio.Consultar();
            var listaResultado = new List<RegistroAlimento>();
            try
            {
                if (string.IsNullOrEmpty(fechaInicio))
                {
                    listaResultado = await query
                        .Include(p => p.Usuario)
                        .Include(p => p.Alimento)
                        .ToListAsync();
                }
                else
                {
                    DateTime fech_Inicio = DateTime.ParseExact(fechaInicio, "dd/MM/yyyy", new CultureInfo("es-EC"));
                
                    listaResultado = await query
                        .Include(p => p.Usuario)
                        .Include(p => p.Alimento)
                        .Where(dv =>
                            dv.FechaRegistro.Value.Date >= fech_Inicio.Date
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
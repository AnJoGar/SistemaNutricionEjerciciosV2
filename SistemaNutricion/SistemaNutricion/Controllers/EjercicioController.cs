using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SistemaNutricion.DTO;

using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

using SistemaNutricion.Repository.Contratos;
using SistemaNutricion.DTO;
using SistemaNutricion.Utilidades;
using SistemaNutricion.Repository.Interfaces;
using SistemaNutricion.Repository.Implementacion;
using AutoMapper;



namespace SistemaNutricion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EjercicioController : ControllerBase
    {

        private readonly IEjercicioRepository _context;

        public EjercicioController(IEjercicioRepository context)
        {
            _context = context;
        }

        // GET: api/Ejercicios
        [HttpGet]
        [Route("Lista")]
        public async Task<ActionResult> Lista()
        {
            var rsp = new Response<List<EjercicioDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _context.listaEjercicios();
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = ex.Message;
            }
            return Ok(rsp);
        }

        // GET: api/Ejercicios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EjercicioDTO>> GetEjercicio(int id)
        {
            try
            {
                var ejercicio = await _context.obtenerPorIdEjercicio(id);
                if (ejercicio == null)
                    return NotFound();
                return Ok(ejercicio);
            }
            catch
            {
                return StatusCode(500, "Error al obtener el Ejercicio por ID");
            }
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] EjercicioDTO ejercicio)
        {
            var rsp = new Response<EjercicioDTO>();
            try
            {
                rsp.status = true;
                rsp.value = await _context.crearEjercicio(ejercicio);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = ex.Message;
            }
            return Ok(rsp);
        }

    }
}

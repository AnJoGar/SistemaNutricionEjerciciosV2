using Microsoft.AspNetCore.Mvc;
using SistemaNutricion.DTO;
using SistemaNutricion.Models;
using SistemaNutricion.Repository.Interfaces;
using SistemaNutricion.Utilidades;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SistemaNutricion.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class AlimentoController : ControllerBase
    {
        private readonly IAlimentoRepository _context;

        public AlimentoController(IAlimentoRepository context)
        {
            _context = context;
        }

        // GET: api/Alimentos/Lista
        [HttpGet]
        [Route("Lista")]
        public async Task<ActionResult<Response<List<AlimentoDTO>>>> Lista()
        {
            var rsp = new Response<List<AlimentoDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _context.ListaAlimentos();
                return Ok(rsp);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = ex.Message;
                return StatusCode(500, rsp);
            }
        }

        // GET: api/Alimentos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Response<AlimentoDTO>>> GetAlimento(int id)
        {
            try
            {
                var alimento = await _context.ObtenerPorIdAlimento(id);
                if (alimento == null)
                    return NotFound(new Response<AlimentoDTO> { status = false, msg = "Alimento no encontrado" });
                return Ok(new Response<AlimentoDTO> { status = true, value = alimento });
            }
            catch
            {
                return StatusCode(500, new Response<AlimentoDTO> { status = false, msg = "Error al obtener el Alimento por ID" });
            }
        }

        // POST: api/Alimentos/Guardar
        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] AlimentoDTO alimento)
        {
            var rsp = new Response<AlimentoDTO>();
            try
            {
                rsp.status = true;
                rsp.value = await _context.CrearAlimento(alimento);
                return Ok(rsp);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = ex.Message;
                return StatusCode(500, rsp);
            }
        }
    }
}
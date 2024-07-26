using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaNutricion.DTO;
using SistemaNutricion.Repository.Interfaces;
using SistemaNutricion.Utilidades;

namespace SistemaNutricion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DasboardController : ControllerBase
    {
        private readonly IDasboardRepository _registroAlimentoService;

        public DasboardController(IDasboardRepository registroDasboard)
        {
            _registroAlimentoService = registroDasboard;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DasboardDTO>> ObtenerPorId(int id)
        {
            try
            {
                var odontologo = await _registroAlimentoService.listaDasboard(id);
                if (odontologo == null)
                    return NotFound();
                return Ok(odontologo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener el Odontólogo por ID: {ex.Message}");
            }
        }

     

        // GET: api/Ejercicios
        [HttpGet]
        [Route("Lista")]
        public async Task<ActionResult> Lista()
        {
            var rsp = new Response<List<RegistroEjercicioDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _registroAlimentoService.listaDasboard2();
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("Lista1")]
        public async Task<ActionResult> Lista2()
        {
            var rsp = new Response<List<DasboardDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _registroAlimentoService.listaDasboard1();
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

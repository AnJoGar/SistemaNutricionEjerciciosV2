using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SistemaNutricion.Repository.Contratos;
using SistemaNutricion.DTO;

using SistemaNutricion.Utilidades;
using SistemaNutricion.Repository.Interfaces;
using SistemaNutricion.Repository.Implementacion;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    public class UsuarioController : ControllerBase
    {

        private readonly IUsuarioRepository _UsuarioServicios;
        public UsuarioController(IUsuarioRepository usuarioServicios)
        {
            _UsuarioServicios = usuarioServicios;
        }

        [HttpPost]
        [Route("IniciarSesion")]
        public async Task<IActionResult> IniciarSesion([FromBody] LoginDTO login)
        {
            var rsp = new Response<SesionDTO>();
            try
            {
                rsp.status = true;
                rsp.value = await _UsuarioServicios.ValidarCredenciales(login.Correo, login.Clave);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = ex.Message;
            }
            return Ok(rsp);
        }


        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            var rsp = new Response<List<UsuarioDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _UsuarioServicios.listaUsuarios();
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioDTO>> GetById(int id)
        {
            try
            {
                var odontologo = await _UsuarioServicios.obtenerPorIdUsuario(id);
                if (odontologo == null)
                    return NotFound();
                return Ok(odontologo);
            }
            catch
            {
                return StatusCode(500, "Error al obtener el Odontólogo por ID");
            }
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] UsuarioDTO usuario)
        {
            var rsp = new Response<UsuarioDTO>();
            try
            {
                rsp.status = true;
                rsp.value = await _UsuarioServicios.crearUsuario(usuario);
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

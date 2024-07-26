using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using SistemaNutricion.DTO;
using SistemaNutricion.Models;
using System.Globalization;


namespace SistemaNutricion.Utilidades
{
    public class AutoMapperPerfil : Profile
    {

        public AutoMapperPerfil() {
   #region Usuario
            CreateMap<Usuario, UsuarioDTO>()
                .ForMember(destino => destino.EsActivo, opt => opt.MapFrom(origen => origen.EsActivo == true ? 1 : 0));
            CreateMap<Usuario, SesionDTO>();
            CreateMap<UsuarioDTO, Usuario>()
                .ForMember(destino => destino.EsActivo, opt => opt.MapFrom(origen => origen.EsActivo == 1 ? true : false));
            #endregion

            #region Ejercicio
            CreateMap<EjercicioDTO, Ejercicio>();
            CreateMap<Ejercicio, EjercicioDTO>();
            #endregion

            #region RegistroEjercicio
            CreateMap<RegistroEjercicio, RegistroEjercicioDTO>()
                .ForMember(destino => destino.EjercicioDescripcion, opt => opt.MapFrom(origen => origen.Ejercicio.nombre))
                .ForMember(destino => destino.UsuarioDescripcion, opt => opt.MapFrom(origen => origen.Usuario.NombreApellidos))
                .ForMember(destino => destino.CaloriasQuemadas, opt => opt.MapFrom(src => src.Ejercicio.caloriasQuemadas * src.TiempoEnMinutos));
            CreateMap<RegistroEjercicioDTO, RegistroEjercicio>()
                .ForMember(destino => destino.Usuario, opt => opt.Ignore())

              //    .ForMember(dest => dest.FechaRegistro, opt => opt.MapFrom(src => src.FechaRegistro))
  .ForMember(destino => destino.CaloriasQuemadas, opt => opt.MapFrom(src => src.CaloriasQuemadas));

            #endregion RegistroEjercicio



            #region Dasboard
            CreateMap<DasboardDTO, RegistroEjercicio>();
            /*  .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.RegistroEjercicioId))
             .ForMember(dest => dest.CaloriasQuemadas, opt => opt.MapFrom(src => src.RegistroEjercicioId))
             .ForMember(dest => dest.UsuarioId, opt => opt.MapFrom(src => src.UsuarioId))
             .ForMember(dest => dest.Usuario, opt => opt.MapFrom(src => src.UsuarioDescripcion));
            */
            CreateMap<RegistroEjercicio, DasboardDTO>()
                .ForMember(dest => dest.RegistroEjercicioId, opt => opt.MapFrom(src => src.EjercicioId))
                      .ForMember(dest => dest.RegistroEjercicioDescripcion, opt => opt.MapFrom(src => src.Ejercicio.caloriasQuemadas))
                      .ForMember(dest => dest.UsuarioDescripcion, opt => opt.MapFrom(src => src.Usuario.NombreApellidos));
            #endregion Dasboard


               // .ForMember(destino => destino.CaloriasQuemadas, opt => opt.MapFrom(src => src.CaloriasQuemadas));
           


            #region Reporte
            CreateMap<RegistroEjercicio, ConsultarFechaDTO>()
                .ForMember(destino => destino.EjercicioDescripcion, opt => opt.MapFrom(origen => origen.Ejercicio.nombre))
                .ForMember(destino => destino.UsuarioDescripcion, opt => opt.MapFrom(origen => origen.Usuario.NombreApellidos))
                .ForMember(destino => destino.FechaRegistro, opt => opt.MapFrom(origen => origen.FechaRegistro.Value.ToString("dd/MM/yyyy")))
                .ForMember(destino => destino.CaloriasQuemadas, opt => opt.MapFrom(src => src.Ejercicio.caloriasQuemadas * src.TiempoEnMinutos));
            CreateMap<ConsultarFechaDTO, RegistroEjercicio>()
                .ForMember(destino => destino.Usuario, opt => opt.Ignore())
                .ForMember(destino => destino.CaloriasQuemadas, opt => opt.MapFrom(src => src.CaloriasQuemadas));
            #endregion

            #region Alimento
            CreateMap<Alimento, AlimentoDTO>();
            CreateMap<AlimentoDTO, Alimento>();
            #endregion

            #region RegistroAlimento
            CreateMap<RegistroAlimento, RegistroAlimentoDTO>()
                .ForMember(destino => destino.UsuarioNombre, opt => opt.MapFrom(origen => origen.Usuario.NombreApellidos))
                .ForMember(destino => destino.AlimentoNombre, opt => opt.MapFrom(origen => origen.Alimento.Nombre));
            CreateMap<RegistroAlimentoDTO, RegistroAlimento>()
                .ForMember(destino => destino.Usuario, opt => opt.Ignore())
                .ForMember(destino => destino.Alimento, opt => opt.Ignore());
            #endregion
        }



        


    }
}
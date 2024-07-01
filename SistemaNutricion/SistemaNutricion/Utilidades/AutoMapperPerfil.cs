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
            .ForMember(destino =>
          destino.EsActivo, opt => opt.MapFrom((origen => origen.EsActivo == true ? 1 : 0)))
          ;

            CreateMap<Usuario, SesionDTO>();
            CreateMap<UsuarioDTO, Usuario>()
             .ForMember(destino =>
          destino.EsActivo, opt => opt.MapFrom((origen => origen.EsActivo == 1 ? true : false)));
          ;
            #endregion Usuario

            #region Ejercicio
            

            CreateMap<EjercicioDTO, Ejercicio>();

            CreateMap<Ejercicio, EjercicioDTO>();

            #endregion Ejercicio
            #region RegistroEjercicio




            CreateMap<RegistroEjercicio, RegistroEjercicioDTO>()

        .ForMember(destino => destino.EjercicioDescripcion, opt => opt.MapFrom(origen => origen.Ejercicio.nombre))
        //  .ForMember(dest => dest.FechaRegistro, opt => opt.MapFrom(src => src.FechaRegistro.HasValue ? src.FechaRegistro : new DateTime(2022, 12, 12)))
        .ForMember(destino => destino.UsuarioDescripcion, opt => opt.MapFrom(origen => origen.Usuario.NombreApellidos))
      //  .ForMember(dest => dest.FechaRegistro, opt => opt.MapFrom(src => src.FechaRegistro.ToString("dd/MM/yyyy")))
        .ForMember(destino => destino.CaloriasQuemadas, opt => opt.MapFrom(src => src.Ejercicio.caloriasQuemadas * src.TiempoEnMinutos));
       
            //.ForMember(destino => destino.CaloriasQuemadas, opt => opt.MapFrom(src => src.Ejercicio.caloriasQuemadas));
            CreateMap<RegistroEjercicioDTO, RegistroEjercicio>()
                .ForMember(destino => destino.Usuario, opt => opt.Ignore())
              //    .ForMember(dest => dest.FechaRegistro, opt => opt.MapFrom(src => src.FechaRegistro))
  .ForMember(destino => destino.CaloriasQuemadas, opt => opt.MapFrom(src => src.CaloriasQuemadas));

            #endregion RegistroEjercicio






            #region Reporte



            CreateMap<RegistroEjercicio, CosultarFechaDTO>()

     .ForMember(destino => destino.EjercicioDescripcion, opt => opt.MapFrom(origen => origen.Ejercicio.nombre))
     //  .ForMember(dest => dest.FechaRegistro, opt => opt.MapFrom(src => src.FechaRegistro.HasValue ? src.FechaRegistro : new DateTime(2022, 12, 12)))
     .ForMember(destino => destino.UsuarioDescripcion, opt => opt.MapFrom(origen => origen.Usuario.NombreApellidos))
              .ForMember(destino =>
            destino.FechaRegistro,
            opt => opt.MapFrom(origen => origen.FechaRegistro.Value.ToString("dd/MM/yyyy"))
        )
     .ForMember(destino => destino.CaloriasQuemadas, opt => opt.MapFrom(src => src.Ejercicio.caloriasQuemadas * src.TiempoEnMinutos));

            //.ForMember(destino => destino.CaloriasQuemadas, opt => opt.MapFrom(src => src.Ejercicio.caloriasQuemadas));
            CreateMap<CosultarFechaDTO, RegistroEjercicio>()
                .ForMember(destino => destino.Usuario, opt => opt.Ignore())
  //    .ForMember(dest => dest.FechaRegistro, opt => opt.MapFrom(src => src.FechaRegistro))
//  .ForMember(dest => dest.FechaRegistro, opt => opt.MapFrom(src => src.FechaRegistro.ToString("dd/MM/yyyy")))
  .ForMember(destino => destino.CaloriasQuemadas, opt => opt.MapFrom(src => src.CaloriasQuemadas));

            #endregion Reporte

        }



    }



}


//.ForMember(destino => destino.FechaRegistro,
//opt => opt.MapFrom(src => src.FechaRegistro.HasValue
//   ? src.FechaRegistro.Value.ToString("dd/MM/yyyy HH:mm")
// : string.Empty));
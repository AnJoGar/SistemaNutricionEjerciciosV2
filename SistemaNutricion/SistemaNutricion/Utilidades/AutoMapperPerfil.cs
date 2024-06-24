using AutoMapper;
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
                      .ForMember(destino =>
              destino.EjercicioDescripcion,
              opt => opt.MapFrom(origen => origen.Ejercicio.nombre)
          )
                      .ForMember(destino =>
              destino.UsuarioDescripcion,
              opt => opt.MapFrom(origen => origen.Usuario.NombreApellidos)
          )
                      .ForMember(dest => dest.CaloriasQuemadas, opt => opt.MapFrom(src => src.Ejercicio.caloriasQuemadas * src.TiempoEnMinutos));

            ;

            CreateMap<RegistroEjercicioDTO, RegistroEjercicio>()

.ForMember(destino =>
  destino.Ejercicio,
  opt => opt.Ignore()
 )
.ForMember(destino =>
  destino.Usuario,
  opt => opt.Ignore()
 );
            #endregion RegistroEjercicio


        }

    }
}



using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
namespace SistemaNutricion.Models



{
    public class SistemaNutricionDBcontext:DbContext
    {


        public SistemaNutricionDBcontext()
        {
        }

        public SistemaNutricionDBcontext(DbContextOptions<SistemaNutricionDBcontext> options)
            : base(options)
        {
        }


        public DbSet<Usuario> Usuario { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; } = null!;
        public DbSet<Ejercicio> Ejercicio { get; set; }
       
        public virtual DbSet<Ejercicio> Ejercicios { get; set; } = null!;

        public DbSet<RegistroEjercicio> RegistroEjercicio { get; set; }

        public virtual DbSet<Ejercicio> RegistroEjercicios { get; set; } = null!;

    }
}

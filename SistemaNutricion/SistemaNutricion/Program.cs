using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.EntityFrameworkCore;
using SistemaNutricion.Models;
using SistemaNutricion.Repository.Interfaces;
using static SistemaNutricion.Repository.Implementacion.UsuarioRepositorio;
using SistemaNutricion.Repository;
using SistemaNutricion.Utilidades;
using SistemaNutricion.Repository.Contratos;
using static SistemaNutricion.Repository.Implementacion.EjercicioRepositorio;
using SistemaNutricion.DTO;
using SistemaNutricion.Repository.Implementacion;




var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<SistemaNutricionDBcontext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("sqlConection"));


});
builder.Services.AddTransient(typeof(IGenrericRepository<>), typeof(GenericRepository<>));
AppContext.SetSwitch("Microsoft.Data.SqlClient.DisableCertificateValidation", true);
builder.Services.AddCors(options => {
    options.AddPolicy("NuevaPolitica", app =>
    {
        app.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });

}
  );
// Add services to the container.
builder.Services.AddAutoMapper(typeof(AutoMapperPerfil));
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IEjercicioRepository, EjercicioRepository>();
builder.Services.AddScoped<IRegistroEjercicioRepository, RegistroEjercicioRepositorio>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseCors("NuevaPolitica");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();

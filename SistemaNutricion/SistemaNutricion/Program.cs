using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.EntityFrameworkCore;
using SistemaNutricion.Models;
using SistemaNutricion.Repository.Interfaces;
using static SistemaNutricion.Repository.Implementacion.UsuarioRepositorio;
using SistemaNutricion.Repository;
using SistemaNutricion.Utilidades;
using SistemaNutricion.Repository.Contratos;
using static SistemaNutricion.Repository.Implementacion.AlimentoRepositorio;
using static SistemaNutricion.Repository.Implementacion.EjercicioRepositorio;
using SistemaNutricion.DTO;
using SistemaNutricion.Repository.Implementacion;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.ComponentModel;
using System.Globalization;



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
        .AllowAnyMethod()
        .SetIsOriginAllowedToAllowWildcardSubdomains();
    });

}
  );
// Add services to the container.
builder.Services.AddAutoMapper(typeof(AutoMapperPerfil));
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IEjercicioRepository, EjercicioRepository>();
builder.Services.AddScoped<IRegistroEjercicioRepository, RegistroEjercicioRepositorio>();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.JsonSerializerOptions.WriteIndented = true;
    //options.JsonSerializerOptions.Converters.Add(new DateTimeConverter());*/
    //  options.JsonSerializerOptions.PropertyNamingPolicy = null; // Desactivar la pol�tica de nombres de propiedad para respetar los nombres tal como est�n en el DTO
    // Agregar un convertidor personalizado si es necesario

    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.JsonSerializerOptions.WriteIndented = true;
    //options.JsonSerializerOptions.Converters.Add(new JsonDateTimeConverter("dd/MM/yyyy"));
    
});


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
/*public class DateTimeConverter : JsonConverter<DateTime>
{
    private readonly string _format = "dd/MM/yyyy";

    public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        return DateTime.ParseExact(reader.GetString(), _format, CultureInfo.InvariantCulture);
    }


    public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString(_format));
    }


}*/

/*public class JsonDateTimeConverter : JsonConverter<DateTime>
{
    private readonly string _format = "dd/MM/yyyy";

    public override DateTime Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options)
    {
        return DateTime.ParseExact(reader.GetString(), _format, null);
    }

    public override void Write(
        Utf8JsonWriter writer,
        DateTime value,
        JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString(_format));
    }
}*/
/*public class DateTimeConverter : JsonConverter<DateTime>
{
    private readonly string _format = "dd/MM/yyyy";
    public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TryGetDateTime(out DateTime date))
        {
            return date;
        }
        else if (DateTime.TryParse(reader.GetString(), out date))
        {
            return date;
        }
        else
        {
            return default; // Puedes manejar errores o retornar un valor predeterminado si la conversi�n falla
        }
    }

    public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString("yyyy-MM-ddTHH:mm:ssZ"));
    }
}*/

public class JsonDateTimeConverter : JsonConverter<DateTime>
{
    private readonly string _format;

    public JsonDateTimeConverter(string format)
    {
        _format = format;
    }

    public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        return DateTime.ParseExact(reader.GetString(), _format, CultureInfo.InvariantCulture);
    }

    public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString(_format));
    }
}
public class CustomDateTimeConverter : JsonConverter<DateTime>
{
    private const string DateFormat = "dd/MM/yyyy"; // Formato de fecha deseado

    public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType == JsonTokenType.String)
        {
            if (DateTime.TryParseExact(reader.GetString(), DateFormat, null, System.Globalization.DateTimeStyles.None, out DateTime date))
            {
                return date;
            }
        }
        throw new JsonException();
    }

    public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString(DateFormat));
    }
}
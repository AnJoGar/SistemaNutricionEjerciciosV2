using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SistemaNutricion.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Alimento",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Calorias = table.Column<double>(type: "float", nullable: false),
                    Carbohidratos = table.Column<double>(type: "float", nullable: false),
                    Grasas = table.Column<double>(type: "float", nullable: false),
                    Proteinas = table.Column<double>(type: "float", nullable: false),
                    Sodio = table.Column<double>(type: "float", nullable: false),
                    Azucar = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Alimento", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ejercicio",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    caloriasQuemadas = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ejercicio", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreApellidos = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Correo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Clave = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EsActivo = table.Column<bool>(type: "bit", nullable: true),
                    FechaRegistro = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuario", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Dasboard",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistroEjercicioId = table.Column<int>(type: "int", nullable: false),
                    UsuarioId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dasboard", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Dasboard_Ejercicio_RegistroEjercicioId",
                        column: x => x.RegistroEjercicioId,
                        principalTable: "Ejercicio",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Dasboard_Usuario_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RegistroAliemnto",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UsuarioId = table.Column<int>(type: "int", nullable: false),
                    AlimentoId = table.Column<int>(type: "int", nullable: false),
                    Porcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cantidad = table.Column<int>(type: "int", nullable: false),
                    Gramos = table.Column<double>(type: "float", nullable: false),
                    FechaRegistro = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistroAliemnto", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RegistroAliemnto_Alimento_AlimentoId",
                        column: x => x.AlimentoId,
                        principalTable: "Alimento",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RegistroAliemnto_Usuario_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RegistroEjercicio",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UsuarioId = table.Column<int>(type: "int", nullable: false),
                    EjercicioId = table.Column<int>(type: "int", nullable: false),
                    TiempoEnMinutos = table.Column<double>(type: "float", nullable: false),
                    CaloriasQuemadas = table.Column<double>(type: "float", nullable: false),
                    FechaRegistro = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "GETDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistroEjercicio", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RegistroEjercicio_Ejercicio_EjercicioId",
                        column: x => x.EjercicioId,
                        principalTable: "Ejercicio",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RegistroEjercicio_Usuario_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dasboard_RegistroEjercicioId",
                table: "Dasboard",
                column: "RegistroEjercicioId");

            migrationBuilder.CreateIndex(
                name: "IX_Dasboard_UsuarioId",
                table: "Dasboard",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_RegistroAliemnto_AlimentoId",
                table: "RegistroAliemnto",
                column: "AlimentoId");

            migrationBuilder.CreateIndex(
                name: "IX_RegistroAliemnto_UsuarioId",
                table: "RegistroAliemnto",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_RegistroEjercicio_EjercicioId",
                table: "RegistroEjercicio",
                column: "EjercicioId");

            migrationBuilder.CreateIndex(
                name: "IX_RegistroEjercicio_UsuarioId",
                table: "RegistroEjercicio",
                column: "UsuarioId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Dasboard");

            migrationBuilder.DropTable(
                name: "RegistroAliemnto");

            migrationBuilder.DropTable(
                name: "RegistroEjercicio");

            migrationBuilder.DropTable(
                name: "Alimento");

            migrationBuilder.DropTable(
                name: "Ejercicio");

            migrationBuilder.DropTable(
                name: "Usuario");
        }
    }
}

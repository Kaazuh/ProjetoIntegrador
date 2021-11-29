using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

namespace CliMedAPI.Migrations
{
    public partial class createPaciente : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Especialistas",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    crm = table.Column<int>(type: "int", nullable: false),
                    nomeEspecialista = table.Column<string>(type: "text", nullable: false),
                    especialidade = table.Column<string>(type: "text", nullable: false),
                    telefone = table.Column<string>(type: "varchar(8)", maxLength: 8, nullable: false),
                    email = table.Column<string>(type: "text", nullable: false),
                    exigePlano = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Especialistas", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Pacientes",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    nomePaciente = table.Column<string>(type: "text", nullable: false),
                    cpf = table.Column<string>(type: "varchar(11)", maxLength: 11, nullable: false),
                    telefone = table.Column<string>(type: "varchar(8)", maxLength: 8, nullable: false),
                    dataNascimento = table.Column<DateTime>(type: "datetime", nullable: false),
                    planoSaude = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pacientes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Consultas",
                columns: table => new
                {
                    codigo = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    dataConsulta = table.Column<DateTime>(type: "datetime", nullable: false),
                    PacienteId = table.Column<int>(type: "int", nullable: false),
                    EspecialistaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Consultas", x => x.codigo);
                    table.ForeignKey(
                        name: "FK_Consultas_Especialistas_EspecialistaId",
                        column: x => x.EspecialistaId,
                        principalTable: "Especialistas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Consultas_Pacientes_PacienteId",
                        column: x => x.PacienteId,
                        principalTable: "Pacientes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Consultas_EspecialistaId",
                table: "Consultas",
                column: "EspecialistaId");

            migrationBuilder.CreateIndex(
                name: "IX_Consultas_PacienteId",
                table: "Consultas",
                column: "PacienteId");

            migrationBuilder.CreateIndex(
                name: "IX_Especialistas_crm",
                table: "Especialistas",
                column: "crm",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Especialistas_telefone",
                table: "Especialistas",
                column: "telefone",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Pacientes_cpf",
                table: "Pacientes",
                column: "cpf",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Pacientes_telefone",
                table: "Pacientes",
                column: "telefone",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Consultas");

            migrationBuilder.DropTable(
                name: "Especialistas");

            migrationBuilder.DropTable(
                name: "Pacientes");
        }
    }
}

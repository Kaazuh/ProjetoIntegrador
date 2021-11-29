using CliMedAPI.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CliMedAPI.Data
{
    public class PacienteContext : DbContext
    {
        public PacienteContext(DbContextOptions<PacienteContext> opt) : base(opt)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            builder.Entity<Paciente>()
               .HasIndex(p => p.cpf)
               .IsUnique(true);

            builder.Entity<Paciente>()
               .HasIndex(p => p.telefone)
               .IsUnique(true);

            builder.Entity<Especialista>()
               .HasIndex(e => e.crm)
               .IsUnique(true);

            builder.Entity<Especialista>()
               .HasIndex(e => e.telefone)
               .IsUnique(true);

            builder.Entity<Consulta>()
                .HasOne(consulta => consulta.Paciente)
                .WithMany(paciente => paciente.Consultas)
                .HasForeignKey(consulta => consulta.PacienteId);

            builder.Entity<Consulta>()
                .HasOne(consulta => consulta.Especialista)
                .WithMany(especialista => especialista.Consultas)
                .HasForeignKey(consulta => consulta.EspecialistaId);
        }

        public DbSet<Paciente> Pacientes { get; set; }
        public DbSet<Especialista> Especialistas { get; set; }
        public DbSet<Consulta> Consultas { get; set; }
    }
}

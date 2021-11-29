using AutoMapper;
using CliMedAPI.Data.Dtos;
using CliMedAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CliMedAPI.Profiles
{
    public class PacienteProfile : Profile
    {
        public PacienteProfile()
        {
            CreateMap<CreatePacienteDto, Paciente>();
            CreateMap<Paciente, ReadPacienteDto>()
                .ForMember(paciente => paciente.Consultas, opts => opts
                .MapFrom(paciente => paciente.Consultas.Select
                (consulta => new { consulta.codigo, consulta.dataConsulta })));
            CreateMap<UpdatePacienteDto, Paciente>();
        }
    }
}

using CliMedAPI.Data.Dtos;
using CliMedAPI.Model;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CliMedAPI.Data.Dtos.Consulta;

namespace CliMedAPI.Profiles
{
    public class ConsultaProfile : Profile
    {
        public ConsultaProfile()
        {
            CreateMap<CreateConsultaDto, Consulta>();
            CreateMap<Consulta, ReadConsultaDto>();
            CreateMap<UpdateConsultaDto, Consulta>();
        }
    }
}

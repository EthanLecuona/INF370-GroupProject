using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.ViewModels
{
    public class ClientView
    {
        public int ClientId { get; set; }
        public TitleView TitleId { get; set; }
        public string ClientName { get; set; }
        public string ClientSurname { get; set; }
        public string ClientPhone { get; set; }
        public CompanyView CompanyId { get; set; }
    }
}

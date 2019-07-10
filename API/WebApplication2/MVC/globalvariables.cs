using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace MVC
{
    public class GlobalVariables
    {
        public static HttpClient webApiClient = new HttpClient();

        static GlobalVariables()
        {
            // imposto un address di base
            webApiClient.BaseAddress = new Uri("http://localhost:60537/api/");
            webApiClient.DefaultRequestHeaders.Clear();
            // imposto il formato dei dati che voglio
            webApiClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }
    }
}
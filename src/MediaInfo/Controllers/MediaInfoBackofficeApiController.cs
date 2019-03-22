using System.Configuration;
using System.Threading.Tasks;
using Umbraco.Web.Editors;
using Umbraco.Web.Mvc;
using Umbraco.Core;
using System.IO;

namespace MediaInfo.Controllers
{
    [PluginController("MediaInfo")]
    public class MediaInfoBackofficeApiController : UmbracoAuthorizedJsonController
    {
        [System.Web.Http.HttpPost]
        public FileInfo GetFileInfo(string filePath)
        {
            if(File.Exists(filePath))
            {
                return new FileInfo(filePath);
            }
            return null;
        }

        public class ApiInstruction
        {
            public string ImageUri { get; set; }
        }
    }
}

using MetadataExtractor;
using System.Collections.Generic;
using System.IO;
using Umbraco.Web;
using Umbraco.Web.Editors;
using Umbraco.Web.Mvc;

namespace MediaInfo.Controllers
{
    [PluginController("MediaInfo")]
    public class MediaInfoBackofficeApiController : UmbracoAuthorizedJsonController
    {
        private readonly IUmbracoContextAccessor _umbracoContextAccessor;

        public MediaInfoBackofficeApiController(IUmbracoContextAccessor umbracoContextAccessor)
        {
            _umbracoContextAccessor = umbracoContextAccessor;
        }

        [System.Web.Http.HttpPost]
        public IReadOnlyList<MetadataExtractor.Directory> GetFileInfo(ApiInstruction apiInstruction)
        {
            var filePath = _umbracoContextAccessor.UmbracoContext.HttpContext.Server.MapPath(apiInstruction.ImageUrl);
            if(File.Exists(filePath))
            {
                var directories = ImageMetadataReader.ReadMetadata(filePath);
                return directories;
            }
            return null;
        }

        public class ApiInstruction
        {
            public string ImageUrl { get; set; }
        }
    }
}

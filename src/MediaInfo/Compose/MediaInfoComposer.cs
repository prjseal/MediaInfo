using Umbraco.Core;
using Umbraco.Core.Composing;

namespace MediaInfo.Compose
{
    [RuntimeLevel(MinLevel = RuntimeLevel.Run)]
    public class MediaInfoComposer : IUserComposer
    {
        public void Compose(Composition composition)
        {
            composition.Components().Append<MediaInfoComponent>();
        }
    }
}

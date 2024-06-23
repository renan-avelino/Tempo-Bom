export function condition (condition)
{
  switch(condition)
  {
    case 'storm':
            return {
                name: 'rainy-outline',
                color: 'rgb(30, 214, 255)'
            };
        case 'snow':
            return {
                name: 'snow-outline',
                color: 'rgb(255, 255, 255)'
            };
        case 'hail':
            return {
                name: 'hail-outline',
                color: 'rgb(180, 180, 180)'
            };
        case 'rain':
            return {
                name: 'rainy-outline',
                color: 'rgb(0, 128, 255)'
            };
        case 'fog':
            return {
                name: 'cloud-outline',
                color: 'rgb(169, 169, 169)'
            };
        case 'clear_day':
            return {
                name: 'sunny-outline',
                color: 'rgb(255, 223, 0)'
            };
        case 'clear_night':
            return {
                name: 'moon-outline',
                color: 'rgb(255, 255, 255)'
            };
        case 'cloud':
            return {
                name: 'cloud-outline',
                color: 'rgb(128, 128, 128)'
            };
        case 'cloudly_day':
            return {
                name: 'partly-sunny-outline',
                color: 'rgb(192, 192, 192)'
            };
        case 'cloudly_night':
            return {
                name: 'cloudy-night-outline',
                color: 'rgb(105, 105, 105)'
            };
        case 'none_day':
            return {
                name: 'help-outline',
                color: 'rgb(255, 165, 0)'
            };
        case 'none_night':
            return {
                name: 'help-outline',
                color: 'rgb(139, 69, 19)'
            };
        default:
            return {
                name: 'help-outline',
                color: 'rgb(0, 0, 0)'
            };
    
  }
}
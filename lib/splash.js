
import dom from 'vd';

export default function splash({ name, logo, active, total, channels, iframe }){
  let div = dom('.splash',
    
    !iframe && dom('header',
      dom('.container',
        dom('<img src="https://slack-files.com/files-pub/T04469Z4C-F045ARDG7-1f29247398/clean-black.png">'),
        dom('<a href="https://readytofight.slack.com/">', 'Login')
      )
    ),

    !iframe && dom('.image-block',
      dom('.background-image-holder')
    ),

    !iframe && dom('.container',
      dom('.primary-cta', 
        dom('p',
          'Join ', dom('b', name),
          // mention single single-channel inline
          channels && channels.length === 1 && dom('span', ' #', channels[0]),
          ' on Slack.'
        ),
        dom('p.status',
          active
            ? [
              dom('b.active', active), ' users online now of ',
              dom('b.total', total), ' registered.'
            ]
            : [dom('b.total', total), ' users are registered so far.']
        ),
        dom('form',
          dom('input.form-item type=email placeholder=you@yourdomain.com '
            + (!iframe ? 'autofocus' : '')),
          dom('button.loading', 'Get my Invite')
        )      
      ),
      dom('p.hide', 'stop looking at me')                 
    ),

    style({ logo, active, iframe }),
    // xxx: single build
    dom('script src=https://cdn.socket.io/socket.io-1.3.2.js'),
    dom('script src=/assets/superagent.js'),
    dom('script src=/assets/client.js')
  );
  return div;
}

const pink = '#E01563';

function style({ logo, active, iframe } = {}){
  var css = dom.style();

  css.add('.splash', {
    'width': '100%',
    'height': '100%',
    'max-width': '1600px',
    'overflow': 'hidden',
    'background': '#ecf0f3',
    'font-family': '"Helvetica Neue", Helvetica, Arial'
  });

  css.add('body', {
    'margin': '0',
    'height': '100%'
  });
  css.add('.hide', {
    'display': 'none'
  });

  css.add('header', {
    'position': 'absolute',
    'top': '0',
    'left': '0',
    'right': '0',
    'height': '80px',
    'z-index': '1',
    'background': '#fff'
  });

  css.add('header img', {
    'width': '85px',
    'position': 'relative',
    'top': '10px'
  });

  css.add('header a', {
    'float': 'right',
    'background-color': '#34495e',
    'text-decoration': 'none',
    'border-radius': '50px',
    'color': '#fff',
    'padding': '10px 30px',
    'font-size': '14px',
    'position': 'relative',
    'top': '21px'
  });

  css.add('header a:hover', {
    'background-color': '#16a085',
    'transition': '.2s ease-in'
  });

  css.add('.container', {
    'position': 'relative',
    'z-index': '2',
    'width': '1170px',
    'margin': '0 auto'
  });

  css.add('.primary-cta', {
    'position': 'relative',
    'left': '58.33333333%',
    'width': '41.66666667%',
    'float': 'left',
    'margin-top': '130px'
  });

  if (iframe) {
    css.add('body, html', {
      'margin': '0',
      'padding': '0',
      'background': '#FAFAFA',
      'overflow': 'hidden' // ff
    });

    css.add('.splash', {
      'box-sizing': 'border-box',
      'padding': '10px'
    });
  }

  if (!iframe) {
    css
    .media('(max-width: 500px)')
    .add('.splash', {
      'margin-top': '100px'
    });
  }

  css.add('.head', {
    'margin-bottom': '40px'
  });

  css.add('.logos', {
    'position': 'relative',
    'margin-bottom': '40px'
  });

  if (!iframe) {
    css.add('.logo', {
      'width': '48px',
      'height': '48px',
      'display': 'inline-block',
      'background-size': 'cover'
    });

    css.add('.logo.slack', {
      'background-image': 'url(/assets/slack.svg)'
    });

    if (logo) {
      let pw = 10; // '+' width
      let lp = 30; // logos separation

      css.add('.logo.org::after', {
        'position': 'absolute',
        'display': 'block',
        'content': '"+"',
        'top': '15px',
        'left': '0',
        'width': '300px',
        'text-align': 'center',
        'color': '#D6D6D6',
        'font': '15px Helvetica Neue'
      });

      css.add('.logo.org', {
        'background-image': `url(${logo})`,
        'margin-right': `${lp + pw + lp}px`
      });
    }
  }

  css.add('p', {
    'font-size': iframe ? '12px' : '15px',
    'margin': iframe ? '0 0 5px' : '5px 0'
  });

  if (iframe) {
    css.add('p.status', {
      'font-size': '11px'
    });
  }

  css.add('.image-block', {
    'float': 'left',
    'position': 'absolute',
    'height': '100%',
    'top': '0',
    'width': '50%'
  });

  css.add('.background-image-holder', {
    'background': 'url(http://0.media.dorkly.cvcdn.com/24/34/94c871bbe06500d6573deaf397b8e3b0.jpg) 50% 50%',
    'height': '100%',
    'background-size': 'cover'
  });

  css.add('select', {
    'background': 'none'
  });

  css.add('.channel-options', {
    'list-style-type': 'none',
    'margin': '0',
    'height': '270px',
    'overflow': 'auto',
    'border': '1px solid #ddd',
    'padding': '0',
    'padding-left': '11px',
    'padding-top': '13px'
  });

  css.add('.channel-options li', {
    'float' : 'left'
  });

  css.add('.channel-options input[type=checkbox]', {
    // 'display' : 'none'
  });

  css.add('label', {
    'width': '108px',
    'height': '113px',
    'float': 'left',
    'margin-bottom': '10px',
    'margin-right': '10px',
    'background-color': 'red',
    'background-size': 'cover',
    'filter': 'url("data:image/svg+xml;utf8,&lt;svg xmlns=\'http://www.w3.org/2000/svg\'&gt;&lt;filter id=\'grayscale\'&gt;&lt;feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/&gt;&lt;/filter&gt;&lt;/svg&gt;#grayscale")',
    '-webkit-filter': 'grayscale(100%)'
  });

  css.add('label:hover', {
    'filter': 'none',
    '-webkit-filter': 'grayscale(0%)',
    'transition': '.2s ease-in'
  });

  css.add('li:nth-child(1) label', {
    'background-image': 'url("https://slack-files.com/files-pub/T04469Z4C-F08P2NYH2-e534021fdf/bowser.jpg")'
  });

  css.add('li:nth-child(2) label', {
    'background-image': 'url("https://slack-files.com/files-pub/T04469Z4C-F08P28WCW-f6de1398eb/mario.jpg")'
  });

  css.add('.channel-options input[type=checkbox] + label', {
    'background' : '#999',
    'height' : '16px',
    'width' : '16px',
    'display' : 'inline-block',
    'padding' : '0 0 0 0px'
  });

  css.add('.channel-options input[type=checkbox]:checked + label', {
    'background' : '#0080FF',
    'height' : '16px',
    'width' : '16px',
    'display' : 'inline-block',
    'padding' : '0 0 0 0px'
  });

  css.add('button, .form-item', {
    'font-size': '12px',
    'height': '32px',
    'line-height': '32px',
    'margin-top': iframe ? '5px' : '10px',
    'vertical-align': 'middle',
    'display': 'block',
    'text-align': 'center',
    'box-sizing': 'border-box',
    'width': '100%'
  });

  css.add('button', {
    'color': '#fff',
    'font-weight': 'bold',
    'border-width': 0,
    'background': pink,
    'text-transform': 'uppercase',
    'cursor': 'pointer',
    'appearence': 'none',
    '-webkit-appearence': 'none',
    'padding': '0',
    'outline': '0',
    'transition': 'background-color 150ms ease-in, color 150ms ease-in'
  });

  css.add('button.loading', {
    'pointer-events': 'none'
  });

  css.add('button:disabled', {
    'color': '#9B9B9B',
    'background-color': '#D6D6D6',
    'cursor': 'default',
    'pointer-events': 'none'
  });

  css.add('button.error', {
    'background-color': '#F4001E'
  });

  css.add('button.success:disabled', {
    'color': '#fff',
    'background-color': '#68C200'
  });

  css.add('button:not(.disabled):active', {
    'background-color': '#7A002F',
  });

  css.add('b', {
    'transition': 'transform 150ms ease-in'
  });

  css.add('b.grow', {
    'transform': 'scale(1.3)'
  });

  css.add('form', {
    'margin-top': iframe ? '10px' : '20px',
    'margin-bottom': '0'
  });

  css.add('input', {
    'color': '#9B9B9B',
    'border': '1px solid #D6D6D6'
  });

  if (iframe) {
    css.add('input, button', {
      'font-size': '11px',
      'height': '28px',
      'line-height': '28px'
    });
  }

  css.add('input:focus', {
    'color': '#666',
    'border-color': '#999',
    'outline': '0'
  });

  if (active) {
    css.add('.active', {
      'color': pink
    });
  }

  if (!iframe) {
    css.add('footer', {
      'color': '#D6D6D6',
      'font-size': '11px',
      'margin': '200px auto 0',
      'width': '300px',
      'text-align': 'center',
    });

    css.add('footer a', {
      'color': '#9B9B9B',
      'text-decoration': 'none',
      'border-bottom': '1px solid #9B9B9B'
    });

    css.add('footer a:hover', {
      'color': '#fff',
      'background-color': '#9B9B9B'
    });
  }

  return css;
}

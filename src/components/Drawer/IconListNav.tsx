export default function IconListNav({ links }: { links: string }) {
  return (
    links === "/products" ? <svg style={{ transform: "scale(.85)" }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.1916 5.13895L4.08961 7.18995L12.73 11.8701L16.8319 9.81914L8.1916 5.13895ZM2.96558 8.28701V17.2155C2.96558 17.4996 3.12608 17.7593 3.38017 17.8863L11.9655 22.179V13.162L2.96558 8.28701ZM13.4655 22.1791L22.051 17.8863C22.3051 17.7593 22.4656 17.4996 22.4656 17.2155V8.67937L18.9655 10.4294V13.2156C18.9655 13.6298 18.6297 13.9656 18.2155 13.9656C17.8013 13.9656 17.4655 13.6298 17.4655 13.2156V11.1794L13.4655 13.1794V22.1791ZM21.7159 7.37714L13.051 3.04467C12.8398 2.9391 12.5913 2.9391 12.3802 3.04467L9.82928 4.32011L18.4696 9.0003L21.7159 7.37714Z" fill="black" />
    </svg> :
      links === "/orders" ? <svg style={{ transform: "scale(.85)" }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9954 3.7187L5.71558 3.71564V21.7156H19.7156L19.7147 12.4373C19.7147 12.2166 19.6956 11.9962 19.6592 11.7785C19.2953 9.59949 18.234 8.12807 16.055 8.49196L14.7156 8.71564L14.9393 7.37622C14.9756 7.15848 14.9939 6.9381 14.9939 6.71735C14.9939 4.50821 13.2046 3.7187 10.9954 3.7187ZM8.46558 7.71583C8.46558 7.30162 8.80136 6.96583 9.21558 6.96583H11.7156C12.1298 6.96583 12.4656 7.30162 12.4656 7.71583C12.4656 8.13004 12.1298 8.46583 11.7156 8.46583H9.21558C8.80136 8.46583 8.46558 8.13004 8.46558 7.71583ZM8.46558 11.7158C8.46558 11.3016 8.80136 10.9658 9.21558 10.9658H16.2156C16.6298 10.9658 16.9656 11.3016 16.9656 11.7158C16.9656 12.13 16.6298 12.4658 16.2156 12.4658H9.21558C8.80136 12.4658 8.46558 12.13 8.46558 11.7158ZM8.46558 14.7158C8.46558 14.3016 8.80136 13.9658 9.21558 13.9658H16.2156C16.6298 13.9658 16.9656 14.3016 16.9656 14.7158C16.9656 15.13 16.6298 15.4658 16.2156 15.4658H9.21558C8.80136 15.4658 8.46558 15.13 8.46558 14.7158ZM8.46558 17.7158C8.46558 17.3016 8.80136 16.9658 9.21558 16.9658H16.2156C16.6298 16.9658 16.9656 17.3016 16.9656 17.7158C16.9656 18.13 16.6298 18.4658 16.2156 18.4658H9.21558C8.80136 18.4658 8.46558 18.13 8.46558 17.7158ZM14.9656 3.96649C17.2256 4.72635 18.7953 6.37216 19.4583 8.68771C19.318 8.47865 19.1593 8.28074 18.98 8.09788C18.2654 7.36919 17.3453 7.0017 16.3096 6.99714L16.3096 6.99289C16.3096 5.71602 15.8222 4.67765 14.9656 3.96649Z" fill="black" />
      </svg> :
        links === "/admins" ? <svg style={{ transform: "scale(.85)" }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7156 7.71559C16.7156 5.50645 14.9247 3.71559 12.7156 3.71559C10.5064 3.71559 8.71558 5.50645 8.71558 7.71559C8.71558 9.92473 10.5064 11.7156 12.7156 11.7156C14.9247 11.7156 16.7156 9.92473 16.7156 7.71559ZM4.96558 19.0489C4.96558 16.8118 6.73865 14.9656 8.96558 14.9656H16.4656C18.6925 14.9656 20.4656 16.8118 20.4656 19.0489V20.7156C20.4656 21.1298 20.1298 21.4656 19.7156 21.4656H5.71558C5.30136 21.4656 4.96558 21.1298 4.96558 20.7156V19.0489Z" fill="black" />
        </svg> :
          links === "/categories" ? <svg style={{ transform: "scale(.85)" }} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3.21558" y="12.2156" width="5" height="9" rx="1" fill="black" />
            <rect x="10.2156" y="4.21559" width="5" height="17" rx="1" fill="black" />
            <rect x="17.2156" y="16.2156" width="5" height="5" rx="1" fill="black" />
          </svg>
            :
            links === "/vendors" ? <svg style={{ transform: "scale(.85)" }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2013 3.14414C12.9213 2.90608 12.5099 2.90608 12.2299 3.14414L2.22985 11.6441C1.91425 11.9124 1.87587 12.3857 2.14414 12.7013C2.4124 13.0169 2.88572 13.0553 3.20133 12.787L5.71559 10.6499V19.7156C5.71559 20.2679 6.16331 20.7156 6.71559 20.7156H18.7156C19.2679 20.7156 19.7156 20.2679 19.7156 19.7156V10.6499L22.2299 12.787C22.5455 13.0553 23.0188 13.0169 23.287 12.7013C23.5553 12.3857 23.5169 11.9124 23.2013 11.6441L13.2013 3.14414Z" fill="black" />
            </svg> :
              links === "/props" ? <svg style={{ transform: "scale(.85)" }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.7156 7.71559L18.7156 9.71559L15.7156 6.71559L17.7156 4.71559L20.7156 7.71559ZM4.71558 20.7156V17.7156L14.2156 8.21559L17.2156 11.2156L7.71558 20.7156H4.71558Z" fill="black" />
              </svg> : ""
  );
}
export function SiteFooter({ settings }) {
  const name = settings?.artistName ?? 'Gabriel Ceslov'
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-name">{name}</p>
        {settings?.bio && <p className="footer-bio">{settings.bio}</p>}
        {settings?.email && (
          <p><a href={`mailto:${settings.email}`}>{settings.email}</a></p>
        )}
        <p className="footer-copy">Copyright © {new Date().getFullYear()} {name}. All rights reserved.</p>
      </div>
    </footer>
  )
}

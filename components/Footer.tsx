import Link from "next/link"
import { footerData } from "@/data/footer"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 shadow-lg"></div>
                <div className="absolute inset-0 h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 opacity-50 blur-sm"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                {footerData.brand.name}
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              {footerData.brand.description}
            </p>
            <div className="flex space-x-4">
              {footerData.social.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerData.links).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">{footerData.bottom.copyright}</p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>{footerData.bottom.madeWith.text}</span>
            <footerData.bottom.madeWith.icon className="h-4 w-4 text-red-500" />
            <span>{footerData.bottom.madeWith.location}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

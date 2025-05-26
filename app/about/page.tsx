import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { aboutHeroData, missionVisionData, valuesData, whyChooseData, aboutCtaData } from "@/data/about"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg"></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              {aboutHeroData.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {aboutHeroData.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {missionVisionData.map((item) => {
              const Icon = item.icon
              return (
                <Card key={item.title} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="mb-4 p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 w-fit group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`h-8 w-8 text-${item.color}-600 dark:text-${item.color}-400`} />
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{valuesData.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {valuesData.values.map((value) => {
              const Icon = value.icon
              return (
                <div key={value.title} className="text-center group">
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="overflow-hidden">
            <CardHeader className="text-center bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
              <div className="mx-auto mb-4 p-3 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900 dark:to-purple-900 w-fit">
                <whyChooseData.icon className="h-10 w-10 text-violet-600 dark:text-violet-400" />
              </div>
              <CardTitle className="text-2xl lg:text-3xl">{whyChooseData.title}</CardTitle>
              <p className="text-muted-foreground text-base leading-relaxed">{whyChooseData.subtitle}</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {whyChooseData.features.map((feature) => (
                  <div key={feature.title} className="space-y-3">
                    <h4 className="font-semibold text-lg flex items-center gap-3">
                      <span className="text-2xl">{feature.emoji}</span>
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{aboutCtaData.title}</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">{aboutCtaData.subtitle}</p>
        </div>
      </section>
    </div>
  )
}

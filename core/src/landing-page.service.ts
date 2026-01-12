import Anthropic from '@anthropic-ai/sdk';

export interface LandingPagePrompt {
  businessType: string;
  productName: string;
  targetAudience: string;
  mainGoal: string; // 'leads', 'sales', 'signups', 'downloads'
  features?: string[];
  tone?: 'professional' | 'casual' | 'excited' | 'minimal';
}

export interface GeneratedSection {
  type: string;
  content: any;
  aiGenerated: boolean;
}

export class LandingPageService {
  private anthropic: Anthropic;

  constructor(apiKey: string) {
    this.anthropic = new Anthropic({ apiKey });
  }

  async generateLandingPage(prompt: LandingPagePrompt): Promise<any> {
    const systemPrompt = `You are an expert landing page designer and copywriter.
    Generate compelling, conversion-focused landing page content based on user requirements.
    Return valid JSON with sections array containing hero, features, testimonials, cta, and faq sections.`;

    const userPrompt = `Create a landing page for:

Business Type: ${prompt.businessType}
Product Name: ${prompt.productName}
Target Audience: ${prompt.targetAudience}
Main Goal: ${prompt.mainGoal}
${prompt.features ? `Key Features: ${prompt.features.join(', ')}` : ''}
Tone: ${prompt.tone || 'professional'}

Generate a complete landing page with these sections:
1. Hero section with headline, subheadline, and CTA
2. Features section (3-6 features)
3. Social proof/testimonials (3 testimonials)
4. Pricing or CTA section
5. FAQ section (5-7 questions)

Return ONLY valid JSON in this exact format:
{
  "name": "Landing Page Name",
  "title": "SEO Title",
  "description": "SEO Description",
  "template": "saas",
  "sections": [
    {
      "type": "hero",
      "content": {
        "headline": "...",
        "subheadline": "...",
        "ctaText": "...",
        "ctaLink": "#",
        "image": "https://placehold.co/600x400"
      }
    },
    // ... more sections
  ],
  "seo": {
    "keywords": ["keyword1", "keyword2"]
  }
}`;

    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-opus-4-5-20251101',
        max_tokens: 4096,
        temperature: 0.8,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      });

      const content = response.content[0].type === 'text'
        ? response.content[0].text
        : '{}';

      // Extract JSON from response (handle markdown code blocks)
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) ||
                       content.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0];
        return JSON.parse(jsonStr);
      }

      throw new Error('Failed to parse AI response');
    } catch (error) {
      console.error('Error generating landing page:', error);
      throw error;
    }
  }

  async generateSection(
    sectionType: string,
    context: string,
    existingSections: any[]
  ): Promise<GeneratedSection> {
    const sectionPrompts: Record<string, string> = {
      hero: 'compelling hero section with headline, subheadline, and CTA button',
      features: '3-6 feature cards with icons, titles, and descriptions',
      testimonials: '3 customer testimonials with names, roles, and photos',
      pricing: 'pricing table with 2-3 tiers and feature lists',
      cta: 'persuasive call-to-action section',
      faq: '5-7 frequently asked questions with answers',
      stats: '3-4 impressive statistics with numbers and labels',
      team: '3-4 team member cards with photos and bios',
    };

    const prompt = `Generate a ${sectionPrompts[sectionType] || sectionType} for a landing page about: ${context}

Existing sections for context: ${JSON.stringify(existingSections.map(s => s.type))}

Return ONLY valid JSON for this section:
{
  "type": "${sectionType}",
  "content": { /* section-specific content */ },
  "aiGenerated": true
}`;

    const response = await this.anthropic.messages.create({
      model: 'claude-opus-4-5-20251101',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.content[0].type === 'text'
      ? response.content[0].text
      : '{}';

    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) ||
                     content.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      const jsonStr = jsonMatch[1] || jsonMatch[0];
      return JSON.parse(jsonStr);
    }

    throw new Error('Failed to parse section');
  }

  async improveCopy(originalText: string, goal: string): Promise<string> {
    const prompt = `Improve this landing page copy to better achieve: ${goal}

Original: ${originalText}

Return ONLY the improved text, no explanations.`;

    const response = await this.anthropic.messages.create({
      model: 'claude-opus-4-5-20251101',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    });

    return response.content[0].type === 'text'
      ? response.content[0].text
      : originalText;
  }

  async generateVariations(
    section: any,
    count: number = 3
  ): Promise<any[]> {
    const prompt = `Generate ${count} variations of this landing page section:

${JSON.stringify(section, null, 2)}

Create variations that are different but maintain the same structure and goal.
Return as JSON array of ${count} section objects.`;

    const response = await this.anthropic.messages.create({
      model: 'claude-opus-4-5-20251101',
      max_tokens: 3000,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.content[0].type === 'text'
      ? response.content[0].text
      : '[]';

    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) ||
                     content.match(/\[[\s\S]*\]/);

    if (jsonMatch) {
      const jsonStr = jsonMatch[1] || jsonMatch[0];
      return JSON.parse(jsonStr);
    }

    return [];
  }

  getTemplates() {
    return [
      {
        id: 'hero-cta',
        name: 'Hero + CTA',
        description: 'Simple single-page with hero and call-to-action',
        sections: ['hero', 'features', 'cta'],
        preview: '/templates/hero-cta.png',
      },
      {
        id: 'saas',
        name: 'SaaS Product',
        description: 'Full-featured SaaS landing page',
        sections: ['hero', 'features', 'testimonials', 'pricing', 'faq', 'cta'],
        preview: '/templates/saas.png',
      },
      {
        id: 'product',
        name: 'Product Launch',
        description: 'Product showcase with features and social proof',
        sections: ['hero', 'features', 'video', 'testimonials', 'stats', 'cta'],
        preview: '/templates/product.png',
      },
      {
        id: 'event',
        name: 'Event Registration',
        description: 'Event landing page with speakers and schedule',
        sections: ['hero', 'stats', 'team', 'testimonials', 'faq', 'cta'],
        preview: '/templates/event.png',
      },
      {
        id: 'waitlist',
        name: 'Waitlist',
        description: 'Simple waitlist capture page',
        sections: ['hero', 'features', 'cta'],
        preview: '/templates/waitlist.png',
      },
    ];
  }
}

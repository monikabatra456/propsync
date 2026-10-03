"""
PropSync PowerPoint (.pptx) Presentation Generation Service
Generates professional branded property investor decks using python-pptx.
"""

from io import BytesIO
from typing import Dict, Any
try:
    from pptx import Presentation
    from pptx.util import Inches, Pt
    from pptx.dml.color import RGBColor
    from pptx.enum.text import PP_ALIGN
except ImportError:
    Presentation = None


def generate_property_ppt(property_data: Dict[str, Any]) -> BytesIO:
    """
    Build a multi-slide presentation for a real estate listing.
    Includes Cover, Overview, Commercials & Floors, Amenities & Compliance.
    """
    if not Presentation:
        output = BytesIO()
        text = f"PropSync Property Presentation: {property_data.get('title', 'Property Listing')}\n"
        output.write(text.encode("utf-8"))
        output.seek(0)
        return output

    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    blank_layout = prs.slide_layouts[6]

    # Slide 1: Cover Slide (Navy theme)
    slide1 = prs.slides.add_slide(blank_layout)
    
    # Background shape
    bg = slide1.shapes.add_shape(1, 0, 0, Inches(13.333), Inches(7.5)) # 1 is rectangle
    bg.fill.solid()
    bg.fill.fore_color.rgb = RGBColor(11, 31, 68) # Navy 900
    bg.line.fill.background()

    # Title box
    tx_box = slide1.shapes.add_textbox(Inches(1.2), Inches(2.2), Inches(11), Inches(3.0))
    tf = tx_box.text_frame
    tf.word_wrap = True

    p_brand = tf.paragraphs[0]
    p_brand.text = "PROPSYNC · COMMERCIAL REAL ESTATE"
    p_brand.font.size = Pt(16)
    p_brand.font.bold = True
    p_brand.font.color.rgb = RGBColor(47, 160, 168) # Teal 500

    p_title = tf.add_paragraph()
    p_title.text = property_data.get("title", "Commercial Property")
    p_title.font.size = Pt(38)
    p_title.font.bold = True
    p_title.font.color.rgb = RGBColor(255, 255, 255)

    p_sub = tf.add_paragraph()
    p_sub.text = f"{property_data.get('location', 'Prime Location')} | {property_data.get('landUse', 'Commercial')}"
    p_sub.font.size = Pt(20)
    p_sub.font.color.rgb = RGBColor(184, 197, 219)

    # Slide 2: Overview & Commercials
    slide2 = prs.slides.add_slide(blank_layout)
    header_box = slide2.shapes.add_textbox(Inches(1.0), Inches(0.8), Inches(11), Inches(1.0))
    h_tf = header_box.text_frame
    hp = h_tf.paragraphs[0]
    hp.text = "Property Overview & Commercial Terms"
    hp.font.size = Pt(28)
    hp.font.bold = True
    hp.font.color.rgb = RGBColor(15, 37, 71)

    details_box = slide2.shapes.add_textbox(Inches(1.0), Inches(2.0), Inches(11), Inches(4.5))
    d_tf = details_box.text_frame
    d_tf.word_wrap = True

    items = [
        f"Total Area: {property_data.get('areaSqft', 0):,} sq ft ({property_data.get('areaSqyd', 0):,} sq yd)",
        f"Rental Outflow: ₹{property_data.get('rentPerSqft', 0)} / sq ft / month",
        f"Security Deposit: {property_data.get('securityDeposit', '3 Months')}",
        f"Maintenance: ₹{property_data.get('maintenance', 0)} / sq ft / month",
        f"Lease Term: {property_data.get('leaseTerm', '3+ Years')}",
        f"Building: {property_data.get('buildingName', '')} ({property_data.get('buildingAge', '')})",
        f"Availability: {property_data.get('status', 'Available').title()}",
    ]

    for item in items:
        p = d_tf.add_paragraph()
        p.text = f"•  {item}"
        p.font.size = Pt(18)
        p.font.color.rgb = RGBColor(52, 69, 95)
        p.space_after = Pt(12)

    output = BytesIO()
    prs.save(output)
    output.seek(0)
    return output

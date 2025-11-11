import React, { useState, useRef, useEffect } from 'react';

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      text: "👋 Hi! I'm your Land Trading AI Assistant. I can help you with:\n\n• Finding properties\n• Understanding market trends\n• Investment advice\n• Legal documentation\n• Financing options\n\nWhat would you like to explore today?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unhandledCount, setUnhandledCount] = useState(0);
  const [hasGreeted, setHasGreeted] = useState(false); // Track if user already greeted
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced AI response system with keyword detection
  const generateSmartResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();

    // Greeting responses - context-aware
    if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input === 'hi' || input === 'hello' || input === 'hey') {
      if (!hasGreeted) {
        setHasGreeted(true);
        return "👋 Hello! Great to have you here!\n\nI'm your Land Trading AI Assistant, ready to help you with:\n\n✅ **Property Search** - Find residential, commercial, or agricultural properties\n✅ **Market Insights** - Current prices and trends\n✅ **Investment Advice** - ROI analysis and tips\n✅ **Documentation** - Legal paperwork guidance\n✅ **Financing** - Home loans and EMI calculations\n\n**What brings you here today?**\n\n💬 Try: \"Find properties in Mumbai\" or \"What are current prices?\"";
      } else {
        return "👋 Hello again!\n\n**How can I assist you further?**\n\n**Popular actions:**\n🔍 Search for properties\n💰 Check price trends\n📊 Get investment advice\n📄 Verify documents\n🏦 Calculate EMI\n\n**Or ask me anything specific about properties!**";
      }
    }

    // Property search queries
    if (input.includes('find') || input.includes('search') || input.includes('looking for') || input.includes('property') || input.includes('show me')) {
      if (input.includes('cheap') || input.includes('affordable') || input.includes('budget')) {
        return "💰 **Looking for Affordable Properties?**\n\nGreat! I can help you find budget-friendly options.\n\n**Filter by price:**\n• Under ₹50 Lakhs\n• ₹50L - ₹1 Crore\n• ₹1Cr - ₹2 Crore\n\n**Best value locations:**\n• Tier-2 cities (Pune, Ahmedabad, Jaipur)\n• Suburban areas\n• Upcoming neighborhoods\n\n🔍 [Search Affordable Properties](/properties?sort=price_asc)\n\n**Tell me:** Which city are you interested in?";
      }
      if (input.includes('commercial') || input.includes('office') || input.includes('shop') || input.includes('retail')) {
        return "🏢 **Commercial Property Inquiry**\n\nExcellent choice for investment!\n\n**Available options:**\n📍 Office spaces (200-5000 sq.ft)\n🏪 Retail shops in prime locations\n🏭 Warehouses & industrial plots\n💼 Co-working spaces\n\n**Top commercial hubs:**\n• Gurgaon Cyber City\n• Mumbai BKC\n• Bangalore Electronic City\n• Hyderabad Hitec City\n\n🔍 [Browse Commercial Properties](/properties?type=commercial)\n\n**What type of commercial space are you looking for?**";
      }
      if (input.includes('agricultural') || input.includes('farm') || input.includes('land')) {
        return "🌾 **Agricultural Land Inquiry**\n\nPerfect for farming or long-term investment!\n\n**What we offer:**\n✅ Verified agricultural plots\n✅ Water facility availability\n✅ Clear land titles\n✅ Soil quality reports\n\n**Popular farming regions:**\n• Punjab - Wheat/Rice belt\n• Maharashtra - Sugarcane areas\n• Andhra Pradesh - Cotton regions\n• Karnataka - Coffee plantations\n\n🔍 [View Agricultural Land](/properties?type=agricultural)\n\n**Which region interests you?**";
      }
      return "🏠 **Property Search Assistant**\n\nI'll help you find the perfect property!\n\n**Tell me your preferences:**\n1️⃣ Budget range?\n2️⃣ Preferred location?\n3️⃣ Property type (Residential/Commercial/Agricultural)?\n4️⃣ Size requirements?\n\n**Quick search options:**\n🔍 [Search by City](/properties)\n📊 [Market Trends](/insights)\n💡 [Investment Calculator](/calculator)\n\n**Example:** \"Show me 2BHK apartments in Mumbai under 1 crore\"";
    }

    // Price and budget queries
    if (input.includes('price') || input.includes('cost') || input.includes('how much') || input.includes('rate')) {
      return "💰 **Current Property Pricing (2025)**\n\n**Metro cities (per sq.ft):**\n🏙️ Mumbai: ₹15,000 - ₹35,000\n🏙️ Delhi NCR: ₹8,000 - ₹20,000\n🏙️ Bangalore: ₹6,000 - ₹15,000\n🏙️ Hyderabad: ₹5,000 - ₹12,000\n\n**Tier-2 cities (per sq.ft):**\n🏘️ Pune: ₹5,000 - ₹10,000\n🏘️ Ahmedabad: ₹4,000 - ₹8,000\n🏘️ Jaipur: ₹3,500 - ₹7,000\n\n📊 [Detailed Price Trends](/insights)\n🧮 [EMI Calculator](/calculator)\n\n**Which city's pricing would you like to know more about?**";
    }

    // Location queries
    if (input.includes('where') || input.includes('location') || input.includes('area') || input.includes('city') || input.includes('which place')) {
      return "📍 **Top Property Investment Locations (2025)**\n\n**High ROI Areas:**\n📈 Gurgaon (25-30% annual growth)\n📈 Noida Extension (20-25% growth)\n📈 Pune Hinjewadi (18-22% growth)\n📈 Hyderabad Gachibowli (20-25% growth)\n\n**Emerging Hotspots:**\n⭐ Navi Mumbai Panvel\n⭐ Bangalore Whitefield\n⭐ Chennai OMR\n⭐ Ahmedabad Bopal\n\n🗺️ [Explore Map View](/properties?view=map)\n📈 [Location Analysis](/insights)\n\n**Interested in any specific area?**";
    }

    // Investment and ROI queries
    if (input.includes('invest') || input.includes('roi') || input.includes('return') || input.includes('profit')) {
      return "📈 **Smart Investment Guide**\n\n**Best investment types (2025):**\n1️⃣ **Residential plots** - 15-20% annual ROI\n2️⃣ **Commercial spaces** - 8-12% rental yield\n3️⃣ **Agricultural land** - 10-15% appreciation\n4️⃣ **Under-construction** - 25-30% returns\n\n**Investment checklist:**\n✅ Check RERA registration\n✅ Verify land titles\n✅ Analyze location connectivity\n✅ Research future developments\n✅ Calculate total returns\n\n💡 [Investment Calculator](/calculator)\n📊 [Market Reports](/insights)\n🎯 [Featured Opportunities](/properties?featured=true)\n\n**What's your investment budget?**";
    }

    // Documentation and legal queries
    if (input.includes('document') || input.includes('legal') || input.includes('paper') || input.includes('title') || input.includes('verification')) {
      return "📄 **Property Documentation Guide**\n\n**Essential documents:**\n✅ Sale deed / Title deed\n✅ Encumbrance certificate\n✅ Property tax receipts\n✅ NOC from society/authority\n✅ Building approval plans\n✅ Occupancy certificate\n\n**Verification checklist:**\n🔍 Land registry records\n🔍 Previous ownership history\n🔍 Pending litigation check\n🔍 Municipality approvals\n\n**We provide:**\n• Free title verification\n• Legal assistance\n• Documentation support\n• Lawyer consultation\n\n📞 **Need verification help?** Contact our legal team!";
    }

    // Loan and financing queries
    if (input.includes('loan') || input.includes('emi') || input.includes('finance') || input.includes('mortgage') || input.includes('bank')) {
      return "🏦 **Home Loan & Financing (2025 Rates)**\n\n**Current interest rates:**\n🏦 SBI: 8.50% - 9.65%\n🏦 HDFC: 8.60% - 9.50%\n🏦 ICICI: 8.75% - 9.50%\n🏦 LIC Housing: 8.50% - 9.25%\n\n**Loan eligibility:**\n• Up to 90% of property value\n• 20-30 years repayment period\n• Tax benefits under 80C & 24(b)\n\n**EMI Example:**\n₹50L loan @ 9% for 20 years = ₹45,000/month\n\n🧮 [EMI Calculator](/calculator)\n💰 [Compare Loan Offers](/loans)\n📞 [Talk to Loan Expert](/contact)\n\n**What's your required loan amount?**";
    }

    // RERA and verification queries
    if (input.includes('rera') || input.includes('verify') || input.includes('authentic') || input.includes('genuine') || input.includes('safe')) {
      return "✅ **RERA & Property Verification**\n\n**What is RERA?**\nReal Estate Regulatory Authority ensures:\n• Project transparency\n• Timely delivery\n• Quality standards\n• Buyer protection\n\n**How to verify:**\n1️⃣ Check RERA registration number\n2️⃣ Visit official RERA website\n3️⃣ Verify project approvals\n4️⃣ Check developer credentials\n\n**Red flags to avoid:**\n🚫 No RERA registration\n🚫 Pending legal disputes\n🚫 Unclear ownership\n🚫 Missing approvals\n\n🔍 **All our properties are RERA verified!**\n📞 Need verification help? Contact us!";
    }

    // Thank you responses
    if (input.includes('thank') || input.includes('thanks') || input.includes('appreciate')) {
      return "😊 **You're very welcome!**\n\nI'm here to help you make the best property decisions.\n\n**Need more assistance?**\n• Ask about specific properties\n• Get market insights\n• Calculate EMIs\n• Verify documents\n• Investment advice\n\n💬 Feel free to ask anything!\n📞 Or [Contact our team](/contact) for personalized help.\n\n**Is there anything else you'd like to know?**";
    }

    // Contact and help queries
    if (input.includes('contact') || input.includes('call') || input.includes('phone') || input.includes('email')) {
      return "📞 **Get in Touch with Us**\n\n**Phone:**\n📱 +91 9877710950 (Sales & Support)\n📱 +91 9877710951 (WhatsApp)\n\n**Email:**\n📧 singhhh0009@gmail.com\n📧 support@landtradingplatform.com\n\n**Office Hours:**\n⏰ Mon-Sat: 9:00 AM - 7:00 PM\n⏰ Sunday: 10:00 AM - 5:00 PM\n\n**Visit us:**\n📍 Multiple offices across India\n\n**Quick actions:**\n💬 [Live Chat](/contact)\n📞 [Request Callback](/contact?callback=true)\n📧 [Send Email](/contact)\n\n**How would you prefer to connect?**";
    }

    // Human agent escalation
    if (input.includes('talk to') || input.includes('human') || input.includes('agent') || 
        input.includes('representative') || input.includes('confused') ||
        input.includes('don\'t understand') || input.includes('complicated') || 
        input.includes('escalate') || input.includes('speak to someone')) {
      return "👤 **Connect with Our Expert Team**\n\nI'll help you reach a human agent for personalized assistance!\n\n📞 **Immediate Support:**\n• Sales & Support: **+91 9877710950**\n• WhatsApp: **+91 9877710951**\n• Customer Care: **+91 9877710952**\n\n📧 **Email Support:**\n• General: singhhh0009@gmail.com\n• Support: support@landtradingplatform.com\n• Sales: sales@landtradingplatform.com\n\n⏰ **Working Hours:**\n• Mon-Fri: 9:00 AM - 7:00 PM\n• Saturday: 9:00 AM - 5:00 PM\n• Sunday: 10:00 AM - 4:00 PM\n\n**Quick Actions:**\n💬 [Start Live Chat](/contact?chat=true)\n📞 [Request Callback](/contact?callback=true)\n📧 [Send Email](/contact?email=true)\n🗓️ [Schedule Meeting](/contact?schedule=true)\n\n**Average Response Time:**\n• Phone: Immediate\n• WhatsApp: 2-5 minutes\n• Email: 1-2 hours\n\n**What's the best way to reach you?**";
    }

    // Default intelligent response with customer care escalation
    return "🤔 **I'd love to help you with property information!**\n\n**I specialize in:**\n• 🏠 Finding properties (residential, commercial, agricultural)\n• 💰 Pricing and market trends\n• 📊 Investment analysis and ROI\n• 📄 Legal documentation and RERA verification\n• 🏦 Home loans and EMI calculations\n• 📍 Location insights and connectivity\n\n**Try asking:**\n❓ \"Find affordable properties in Pune\"\n❓ \"What are the price trends in Bangalore?\"\n❓ \"How to verify property documents?\"\n❓ \"Show me commercial properties\"\n❓ \"Calculate EMI for 50 lakh loan\"\n\n💬 **Ask me something specific and I'll provide detailed help!**\n\n━━━━━━━━━━━━━━━━━━━━━━\n\n**Need Human Assistance?**\n\nIf I couldn't answer your question properly, our expert team is here to help!\n\n📞 **Customer Care:**\n• Sales & Support: **+91 9877710950**\n• WhatsApp: **+91 9877710951**\n• Helpline: **+91 9877710952**\n\n📧 **Email:** singhhh0009@gmail.com\n\n⏰ **Available:** Mon-Sat 9 AM - 7 PM, Sunday 10 AM - 5 PM\n\n💬 [Chat with Human Agent](/contact)\n📞 [Request Callback](/contact?callback=true)";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    // Simulate realistic typing delay
    setTimeout(() => {
      const aiResponse = generateSmartResponse(currentInput);
      const isDefaultResponse = aiResponse.includes("I'd love to help you with property information");
      
      if (isDefaultResponse) {
        setUnhandledCount(prev => prev + 1);
        
        // Auto-escalate after 2 unhandled queries
        if (unhandledCount >= 1) {
          const escalationMessage = {
            role: 'assistant',
            text: "🤝 I'm having difficulty understanding your specific need.\n\nLet me connect you with our expert team for personalized assistance!\n\n📞 Speak with an Expert Now:\n\nSales & Support: +91 9877710950\nWhatsApp: +91 9877710951\nHelpline: +91 9877710952\n\nChoose your preferred contact method:\n💬 [Live Chat](/contact?chat=true)\n📞 [Request Callback](/contact?callback=true)\n📧 [Email: singhhh0009@gmail.com](/contact?email=true)\n\n⏰ Available: Mon-Sat 9 AM - 7 PM\n\nOur team responds within 30 seconds on average!"
          };
          setMessages(prev => [...prev, escalationMessage]);
          setUnhandledCount(0);
          setIsTyping(false);
          return;
        }
      } else {
        setUnhandledCount(0);
      }
      
      const aiMessage = { role: 'assistant', text: aiResponse };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 400);
  };

  // Quick action buttons
  const quickActions = [
    { label: '🏠 Browse Properties', action: () => handleQuickMessage('Show me available properties') },
    { label: '💰 Price Trends', action: () => handleQuickMessage('What are the current price trends?') },
    { label: '📊 Investment Tips', action: () => handleQuickMessage('Give me investment advice') },
    { label: '📄 Documentation Help', action: () => handleQuickMessage('Help me with property documents') }
  ];

  const handleQuickMessage = (message) => {
    setInput(message);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Floating button with pulse animation */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-2xl transition-all z-50 flex items-center justify-center text-3xl animate-pulse hover:animate-none hover:scale-110"
          title="AI Assistant - Ask me anything!"
        >
          🤖
        </button>
      )}

      {/* Enhanced chat window */}
      {open && (
        <div className="fixed bottom-6 right-6 w-[420px] h-[600px] rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                🤖
              </div>
              <div>
                <div className="font-bold text-lg">Land Trading AI</div>
                <div className="text-xs text-white/80 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Online & Ready to Help
                </div>
              </div>
            </div>
            <button 
              onClick={() => setOpen(false)} 
              className="text-white/80 hover:text-white hover:bg-white/10 w-8 h-8 rounded-full flex items-center justify-center transition"
            >
              ✕
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                <div className={`max-w-[85%] rounded-2xl p-4 shadow-md ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none' 
                    : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-none border border-slate-200 dark:border-slate-700'
                }`}>
                  <div className="whitespace-pre-line text-sm leading-relaxed">{msg.text}</div>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-bl-none p-4 shadow-md border border-slate-200 dark:border-slate-700">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions */}
          {messages.length === 1 && (
            <div className="px-4 py-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
              <div className="text-xs text-slate-500 mb-2 font-medium">Quick Actions:</div>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={action.action}
                    className="text-xs px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input area */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Ask me anything about properties..."
                className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-blue-500 dark:focus:border-blue-400 text-slate-900 dark:text-white placeholder-slate-400 outline-none transition"
                disabled={isTyping}
              />
              <button 
                onClick={handleSend} 
                disabled={isTyping || !input.trim()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              >
                ➤
              </button>
            </div>
            <div className="text-[10px] text-slate-400 mt-2 text-center">
              AI-powered • Context-aware • 24/7 available
            </div>
          </div>
        </div>
      )}

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

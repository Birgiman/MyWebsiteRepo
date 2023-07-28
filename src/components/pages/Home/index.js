import axios from 'axios';
import { motion } from 'framer-motion';
import { parseDOM } from 'htmlparser2';
import { useEffect, useRef, useState } from 'react';

import { BsGit } from 'react-icons/bs';
import { DiCode, DiJavascript1, DiNodejsSmall } from 'react-icons/di';
import {
  SiAxios,
  SiCss3,
  SiDocker,
  SiExpress,
  SiGithub,
  SiHtml5,
  SiLinkedin, SiMicrosoftoutlook,
  SiNestjs,
  SiPostgresql,
  SiReact, SiStyledcomponents, SiTailwindcss,
} from 'react-icons/si';
import { TbBrandPrisma, TbBrandReactNative, TbBrandTypescript } from 'react-icons/tb';

import {
  CardRepo,
  CardRepoInfo,
  ContactMe, Container, Content, GitRepos, ImageContainer, Profile, Skills, Stacks,
} from './styles';

export default function Home() {
  const [repositories, setRepositories] = useState([]);

  const token = process.env?.REACT_APP_GITHUB_TOKEN || null;

  const fetchRepositories = async () => {
    try {
      const response = !token
        ? await axios.get('https://api.github.com/users/Birgiman/repos')
        : await axios.get('https://api.github.com/users/Birgiman/repos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      const filteredRepositories = response.data.filter((repo) => repo.topics.includes('website-repo'));

      const repositoriesWithCoverImage = await Promise.allSettled(
        filteredRepositories.map(async (repo) => {
          if (!repo.contents_url) {
            return repo;
          }

          const readmeUrl = repo.contents_url.replace('{+path}', 'README.md');
          const readmeResponse = await axios.get(readmeUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const readmeContentBase64 = readmeResponse.data.content;

          const dom = parseDOM(readmeContentBase64);
          const decodedString = atob(dom[0].data);

          const parser = new DOMParser();
          const doc = parser.parseFromString(decodedString, 'text/html');
          const contentToFilter = doc.all;

          let coverImage = '';

          if (contentToFilter.length > 0) {
            const imgTags = Array.from(contentToFilter).filter((node) => node.id === 'cover-image');
            if (imgTags.length > 0) {
              coverImage = imgTags[0].getAttribute('src') || '';
            }
          }

          let stacks = '';

          if (contentToFilter.length > 0) {
            const liTags = Array.from(contentToFilter).filter((node) => node.id === 'frontend-stack');
            if (liTags.length > 0) {
              stacks = liTags[0].getElementsByTagName('li') || '';
            }
          }

          return {
            ...repo,
            coverImage,
            stacks,
          };
        }),
      );

      const resolvedRepositories = repositoriesWithCoverImage
        .filter((result) => result.status === 'fulfilled')
        .map((result) => result.value);

      setRepositories(resolvedRepositories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  const firstRepo = repositories[0];

  const carousel = useRef();

  return (
    <Container>
      <Content>

        {repositories ? (
          <>
            <Profile>
              {firstRepo && (
              <>
                <img src={firstRepo.owner.avatar_url} alt={firstRepo.owner.login} />
                <h2>Eduardo Birgiman</h2>
                <span>Desenvolvedor Front-End com foco em React.js e novas tecnologias!</span>
              </>
              )}
            </Profile>
            <Skills>
              <h3>Minhas habilidades:</h3>
              <div>
                <DiJavascript1 />
                <span>JavaScript</span>
              </div>
              <div>
                <TbBrandTypescript />
                <span>TypeScript</span>
              </div>
              <div>
                <DiNodejsSmall />
                <span>NodeJs</span>
              </div>
              <div>
                <SiNestjs />
                <span>NestJs</span>
              </div>
              <div>
                <TbBrandPrisma />
                <span>Prisma</span>
              </div>
              <div>
                <SiExpress />
                <span>Express</span>
              </div>
              <div>
                <SiAxios />
                <span>Axios</span>
              </div>
              <div>
                <SiPostgresql />
                <span>Postgres</span>
              </div>
              <div>
                <SiDocker />
                <span>Docker</span>
              </div>
              <div>
                <SiReact />
                <span>React</span>
              </div>
              <div>
                <TbBrandReactNative />
                <span>
                  React-Native
                </span>
              </div>
              <div>
                <SiStyledcomponents />
                <span>Styled-Components</span>
              </div>
              <div>
                <SiTailwindcss />
                <span>TailwindCSS</span>
              </div>
              <div>
                <SiHtml5 />
                <span>HTML</span>
              </div>
              <div>
                <SiCss3 />
                <span>CSS</span>
              </div>
              <div>
                <BsGit />
                <span>Git</span>
              </div>
            </Skills>
            <h3>Meus Projetos</h3>
            <GitRepos
              ref={carousel}
              className="carousel"
            >
              {repositories.length > 0 ? (
                <CardRepo
                  className="inner-carousel"
                  drag="x"
                  dragConstraints={carousel}
                  whileDrag={{ scale: 1.15 }}
                  dragTransition={{ bounceStiffness: 350, bounceDamping: 15 }}
                >
                  {repositories.map((repo) => (
                    <CardRepoInfo
                      key={repo.id}
                      className="item"
                    >
                      <span>{repo.name}</span>
                      <div className="content">
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                          <ImageContainer>
                            {repo.coverImage !== '' ? (
                              <img src={repo.coverImage} alt={repo.name} />
                            ) : (
                              <span>Não contem imagem de capa ❌</span>
                            )}
                          </ImageContainer>
                        </a>
                        <div className="segunda-div">
                          <p>{repo.description}</p>
                          {repo.stacks ? (
                            <Stacks>
                              {Array.from(repo.stacks).map((stack) => (
                                <span key={stack.innerText}>{stack.innerText}</span>
                              ))}
                            </Stacks>
                          ) : (
                            <Stacks>
                              <span>Tecnologia não informada.</span>
                            </Stacks>
                          )}
                          <div className="action">
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                              Ler documentação
                            </a>
                          </div>
                        </div>
                      </div>
                    </CardRepoInfo>
                  ))}
                  <CardRepoInfo
                    className="item"
                  >
                    <span>Em construção...</span>
                    <div
                      className="content"
                    >
                      <a href="https://github.com/Birgiman/" target="_blank" rel="noopener noreferrer">
                        <ImageContainer>
                          <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.3, repeat: Infinity }}
                          >
                            <DiCode className="DiCode" />
                          </motion.div>
                        </ImageContainer>
                      </a>
                      <div className="segunda-div">
                        <p>DESCRICAO</p>
                        <Stacks>
                          <span>Nome da stack</span>
                          <span>Nome da stack</span>
                          <span>Nome da stack</span>
                        </Stacks>
                        <div className="action">
                          <a href="https://github.com/Birgiman/" target="_blank" rel="noopener noreferrer">
                            Ler documentação
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardRepoInfo>
                </CardRepo>
              ) : (
                <p>Carregando...</p>
              )}
            </GitRepos>
            <ContactMe>
              <a href="https://www.linkedin.com/in/eduardo-birgiman-domingues/" target="_blank" rel="noopener noreferrer">
                <motion.button type="button" whileHover={{ scale: 1.2, transition: 0.5 }}>
                  <SiLinkedin size={32} />
                </motion.button>
              </a>
              <a href="mailto:eduardo.birgiman@outlook.com">
                <motion.button type="button" whileHover={{ scale: 1.2, transition: 0.5 }}>
                  <SiMicrosoftoutlook size={32} />
                </motion.button>
              </a>
              <a href="https://github.com/Birgiman/" target="_blank" rel="noopener noreferrer">
                <motion.button type="button" whileHover={{ scale: 1.2, transition: 0.5 }}>
                  <SiGithub size={32} />
                </motion.button>
              </a>
            </ContactMe>
          </>
        ) : (
          <h2>Carregando...</h2>
        )}

      </Content>
    </Container>
  );
}
